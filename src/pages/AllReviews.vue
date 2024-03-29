<template>
  <v-container fluid class="max-width my-4">
    <v-card shaped>
      <v-card-title>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="searchQuery"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              persistent-hint
              hint="Search by app, store name, location or agent name"
              outlined
              clearable
              @input="search(500)"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-dialog v-model="dialog" width="500">
              <template #activator="{ on: dialog, attrs }">
                <v-tooltip right>
                  <template #activator="{ on: tooltip }">
                    <v-btn class="px-10 py-7" dark color="primary" v-bind="attrs" v-on="{ ...tooltip, ...dialog }">
                      <v-icon dark> mdi-tune </v-icon>
                    </v-btn>
                  </template>
                  <span>Open filters</span>
                </v-tooltip>
              </template>

              <v-card>
                <v-card-title class="text-h5 primary white--text mb-6"> Add filters </v-card-title>

                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-select
                        :items="appFilter"
                        v-model="filters.filterByApp"
                        outlined
                        label="Filter By Apps"
                        hide-details
                      ></v-select>
                    </v-col>

                    <v-col cols="6">
                      <v-select
                        :items="ratingFilter"
                        v-model="filters.filterByRating"
                        outlined
                        label="Filter By Rating"
                        hide-details
                      ></v-select>
                    </v-col>

                    <v-col cols="6">
                      <v-checkbox v-model="filters.checkboxUnassigned" hide-details label="Unassigned"></v-checkbox>
                    </v-col>

                    <v-col cols="6">
                      <v-checkbox v-model="filters.checkboxUnreplied" hide-details label="Unreplied"></v-checkbox>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false"> OK </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="auto">
            <download-excel :fetch="() => fetchReportData()" :fields="csvFields" name="All-Reviews.xls" type="xls">
              <v-btn v-if="progressLoading" color="success" class="py-7">
                <v-progress-circular indeterminate color="white" class="mx-14"></v-progress-circular>
              </v-btn>
              <v-btn v-else color="success" class="py-7">
                <v-icon class="mr-2">mdi-download</v-icon>
                Export Table
              </v-btn>
            </download-excel>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="reviews"
          :options.sync="options"
          :items-per-page="options.itemsPerPage"
          :server-items-length="reviewsCount"
          :loading="isLoading"
          loading-text="Loading..."
          :footer-props="{
            'items-per-page-options': [10, 25, 50]
          }"
        >
          <template #[`item.date`]="{ item }">
            <span>{{ item.date.includes('Edited') ? item.date.slice(6) : item.date }}</span>
          </template>

          <template #[`item.rating`]="{ item }">
            <template v-for="i in 5">
              <v-icon small v-if="i <= item.rating" :key="i">mdi-star</v-icon>
              <v-icon small v-else :key="i">mdi-star-outline</v-icon>
            </template>
          </template>

          <template #[`item.comment`]="{ item }">
            <v-btn icon @click="openComment('comment', item.comment)">
              <v-icon color="blue darken-2"> mdi-comment </v-icon>
            </v-btn>
          </template>

          <template #[`item.developerReply`]="{ item }">
            <v-btn icon @click="openComment('reply', item.developerReply)">
              <v-icon color="blue darken-4"> mdi-comment </v-icon>
            </v-btn>
          </template>

          <template #[`item.assignedAgents.agentName`]="{ item }">
            <span v-text="item.assignedAgents.agentName ? item.assignedAgents.agentName : '-'"></span>
          </template>

          <template #[`item.isReplied`]="{ item }">
            <ChipFlag :flag="item.isReplied" />
          </template>

          <template #[`item.actions`]="{ item }">
            <div class="d-inline-flex justify-center">
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    fab
                    dark
                    depressed
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    @click="openModal('assignAgent', item.postId)"
                    ><v-icon>mdi-account-edit</v-icon></v-btn
                  >
                </template>
                <span>Assign Agent</span>
              </v-tooltip>
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    fab
                    dark
                    depressed
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    @click="redirectToShopify(item.postId)"
                    ><v-icon>mdi-launch</v-icon></v-btn
                  >
                </template>
                <span>Open review in Shopify</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- MODALS START -->
    <v-dialog v-model="modal" width="500">
      <!-- READ COMMENT MODAL START -->
      <v-card v-if="modalType === 'comment' || modalType === 'reply'">
        <v-card-title class="text-h5 primary white--text mb-6 d-flex justify-space-between">
          <h3>{{ modalHeader }}</h3>
          <v-btn icon @click="modal = !modal"><v-icon color="white">mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>{{ comment }}</v-card-text>
      </v-card>
      <!-- READ COMMENT MODAL END -->

      <!-- ASSIGN AGENT MODAL START -->
      <v-card v-if="modalType === 'assignAgent'">
        <v-card-title class="text-h5 primary white--text mb-6 d-flex justify-space-between">
          <h3>Assign Agent</h3>
          <v-btn icon @click="modal = !modal"><v-icon color="white">mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          <v-select
            :items="selectAgents"
            v-model="selectAgent"
            label="Select Agent"
            outlined
            @change="pickUpAgentData"
          ></v-select>
        </v-card-text>

        <v-card-actions class="px-6 pb-5">
          <v-btn color="error" @click="modal = !modal">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="assignAgentHandler()">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <!-- ASSIGN AGENT MODAL END -->
    </v-dialog>
    <!-- MODALS END -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DownloadExcel from 'vue-json-excel';
import ChipFlag from '../components/ChipFlag.vue';
import axios from 'axios';

export default {
  name: 'AllReviews',

  components: {
    ChipFlag,
    DownloadExcel
  },

  data: () => ({
    progressLoading: false,
    modal: false,
    modalType: null,
    dialog: false,
    comment: '',
    appFilter: [],
    selectAgents: [],
    selectAgent: null,
    assignAgentURL: '',
    searchQuery: null,
    filters: {
      filterByApp: null,
      filterByRating: null,
      checkboxUnassigned: false,
      checkboxUnreplied: false
    },
    assignAgentData: {
      agentName: '',
      agentEmail: '',
      agentId: ''
    },
    ratingFilter: [
      {
        text: 'All',
        value: null
      },
      {
        text: '1 Star',
        value: 1
      },
      {
        text: '2 Star',
        value: 2
      },
      {
        text: '3 Star',
        value: 3
      },
      {
        text: '4 Star',
        value: 4
      },
      {
        text: '5 Star',
        value: 5
      }
    ],
    headers: [
      {
        text: 'Date',
        value: 'date',
        align: 'left',
        width: 150,
        sortable: false
      },
      {
        text: 'App',
        value: 'displayAppName',
        width: 170,
        sortable: false
      },
      {
        text: 'Store Name',
        value: 'storeName',
        sortable: false,
        width: 170
      },
      {
        text: 'Location',
        value: 'location',
        sortable: false,
        width: 160
      },
      {
        text: 'Star Rating',
        value: 'rating',
        sortable: false,
        align: 'center',
        width: 115
      },
      {
        text: 'Comment',
        value: 'comment',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Reply',
        value: 'developerReply',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Assigned Agent',
        value: 'assignedAgents.agentName',
        sortable: false,
        align: 'center',
        width: 120
      },
      {
        text: 'Replied',
        value: 'isReplied',
        align: 'center',
        sortable: false,
        width: 20
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false,
        width: 80
      }
    ],
    options: {
      page: 1,
      itemsPerPage: 25,
      sortBy: [],
      sortDesc: [false],
      groupBy: [],
      groupDesc: [],
      mustSort: false,
      multiSort: false
    },
    csvFields: {
      Date: 'date',
      App: 'displayAppName',
      'Store Name': 'storeName',
      Location: 'location',
      'Star Rating': 'rating',
      Comment: 'comment',
      Reply: 'developerReply',
      'Assigned Agent': 'assignedAgents.agentName',
      Replied: 'isReplied'
    }
  }),

  computed: {
    ...mapState(['reviews', 'reviewsCount', 'isLoading', 'apps', 'agents']),
    modalHeader() {
      return this.modalType === 'comment' ? 'Comment:' : this.modalType === 'reply' ? 'Reply:' : '';
    }
  },

  async created() {
    this.$store.state.pageTitle = 'All Reviews';
    await this.getApps();
    await this.mapAppNames();
    await this.getAgents();
    this.mapAgents();
  },

  watch: {
    filters: {
      async handler(oldValue, newValue) {
        this.options = {
          page: 1,
          itemsPerPage: 25,
          sortBy: [],
          sortDesc: [false],
          groupBy: [],
          groupDesc: [],
          mustSort: false,
          multiSort: false
        };
        newValue.options = this.options;
        await this.getReviews({ ...newValue, searchQuery: this.searchQuery });
      },
      deep: true
    },
    options: {
      async handler(value) {
        window.scrollTo(0, 0);
        this.filters.options = value;
        await this.getReviews({ ...this.filters, searchQuery: this.searchQuery });
      },
      deep: true
    }
  },

  methods: {
    ...mapActions(['getReviews', 'getApps', 'getAgents']),
    async search(delay) {
      setTimeout(async () => {
        await this.getReviews({ ...this.filters, searchQuery: this.searchQuery });
      }, delay);
    },
    async fetchReportData() {
      try {
        // Early return if already loading -> prevent multiple clicks
        if (this.progressLoading) return;

        this.progressLoading = true;
        const resp = await axios.post('/ha.api/v1/cx-manager/get-report', this.filters);

        return resp.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.progressLoading = false;
      }
    },
    mapAppNames() {
      this.appFilter = this.apps.map((item) => {
        return {
          text: item.displayAppName,
          value: item.appName
        };
      });
      this.appFilter.unshift({ text: 'All', value: null });
    },
    mapAgents() {
      this.selectAgents = this.agents.map((item) => {
        return {
          text: `${item.name} - ${item.email}`,
          value: item.email
        };
      });
    },
    openComment(type, comment) {
      this.modal = !this.modal;
      this.modalType = type;
      this.comment = comment;
    },
    openModal(type, reviewId) {
      this.modal = !this.modal;
      this.modalType = type;
      this.assignAgentURL = `/ha.api/v1/cx-manager/assign-agent-to-review/${reviewId}`;
    },
    pickUpAgentData(email) {
      const agent = this.agents.find((item) => item.email === email);
      this.assignAgentData.agentName = agent.name;
      this.assignAgentData.agentEmail = agent.email;
      this.assignAgentData.agentId = agent._id;
    },
    async assignAgentHandler() {
      await axios.patch(this.assignAgentURL, { assignAgentData: this.assignAgentData });
      this.modal = !this.modal;
      this.selectAgent = null;
    },
    redirectToShopify(reviewId) {
      window.open(`https://apps.shopify.com/partner/reviews/${reviewId}`);
    }
  }
};
</script>

<style scoped>
.max-width {
  max-width: 2000px;
  width: 98%;
  margin-inline: auto;
}
</style>
