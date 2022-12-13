<template>
  <v-container fluid class="max-width">
    <v-card class="mt-10">
      <v-card-title>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="auto">
            <v-select
              :items="appFilter"
              v-model="filters.filterByApp"
              outlined
              label="Filter By Apps"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="auto">
            <v-select
              :items="ratingFilter"
              v-model="filters.filterByRating"
              outlined
              label="Filter By Rating"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="auto">
            <v-checkbox v-model="filters.checkboxUnassigned" hide-details label="Unassigned"></v-checkbox>
          </v-col>

          <v-col cols="auto">
            <v-checkbox v-model="filters.checkboxUnreplied" hide-details label="Unreplied"></v-checkbox>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="auto">
            <download-excel :data="reviews" :fields="csvFields" name="All-Reviews.xls" type="xls">
              <v-btn color="success">
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
          :items-per-page="25"
          :search="search"
          :loading="isLoading"
          loading-text="Loading..."
          :footer-props="{
            'items-per-page-options': [10, 25, 50],
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

          <template #[`item.assignedAgent.agentName`]="{ item }">
            <span
              class="text-center d-block"
              v-text="item.assignedAgent.agentName ? item.assignedAgent.agentName : '-'"
            ></span>
          </template>

          <template #[`item.isReplied`]="{ item }">
            <ChipFlag :flag="item.isReplied" />
          </template>

          <template #[`item.actions`]="{ item }">
            <div class="d-inline-flex justify-center">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
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
                <template v-slot:activator="{ on, attrs }">
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
    <v-overlay :value="overlay">
      <!-- READ COMMENT MODAL START -->
      <v-sheet
        v-if="overlayType === 'comment' || overlayType === 'reply'"
        width="500px"
        min-height="400px"
        class="pa-4"
        rounded
        light
      >
        <v-row class="ma-4" justify="space-between">
          <h3>{{ modalHeader }}</h3>
          <v-btn icon @click="overlay = !overlay"><v-icon>mdi-close</v-icon></v-btn>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <div class="ma-2">{{ comment }}</div>
      </v-sheet>
      <!-- READ COMMENT MODAL END -->

      <!-- ASSIGN AGENT MODAL START -->
      <v-sheet v-if="overlayType === 'assignAgent'" width="500px" min-height="400px" class="pa-4" rounded light>
        <v-row class="ma-4" justify="space-between">
          <h3>Assign Agent</h3>
          <v-btn icon @click="overlay = !overlay"><v-icon>mdi-close</v-icon></v-btn>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <v-select
          :items="selectAgents"
          v-model="selectAgent"
          label="Select Agent"
          outlined
          @change="pickUpAgentData"
        ></v-select>
        <v-row class="pa-4">
          <v-btn color="success" @click="assignAgentHandler()">Submit</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="overlay = !overlay">Cancel</v-btn>
        </v-row>
      </v-sheet>
      <!-- ASSIGN AGENT MODAL END -->
    </v-overlay>
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
    DownloadExcel,
  },

  data: () => ({
    search: '',
    overlay: false,
    overlayType: null,
    comment: '',
    filters: {
      filterByApp: null,
      filterByRating: null,
      checkboxUnassigned: false,
      checkboxUnreplied: false,
    },
    appFilter: [],
    selectAgents: [],
    selectAgent: null,
    assignAgentURL: '',
    assignAgentData: {
      agentName: '',
      agentEmail: '',
      agentId: '',
    },
    ratingFilter: [
      {
        text: 'All',
        value: null,
      },
      {
        text: '1 Star',
        value: 1,
      },
      {
        text: '2 Star',
        value: 2,
      },
      {
        text: '3 Star',
        value: 3,
      },
      {
        text: '4 Star',
        value: 4,
      },
      {
        text: '5 Star',
        value: 5,
      },
    ],
    headers: [
      {
        text: 'Date',
        value: 'date',
        align: 'left',
        width: 150,
        sortable: false,
      },
      {
        text: 'App',
        value: 'displayAppName',
        width: 170,
        sortable: false,
      },
      {
        text: 'Store Name',
        value: 'storeName',
        sortable: false,
        width: 170,
      },
      {
        text: 'Location',
        value: 'location',
        sortable: false,
        width: 160,
      },
      {
        text: 'Star Rating',
        value: 'rating',
        width: 115,
      },
      {
        text: 'Comment',
        value: 'comment',
        sortable: false,
        align: 'center',
        width: 100,
      },
      {
        text: 'Reply',
        value: 'developerReply',
        sortable: false,
        align: 'center',
        width: 100,
      },
      {
        text: 'Assigned Agent',
        value: 'assignedAgent.agentName',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Replied',
        value: 'isReplied',
        align: 'center',
        sortable: false,
        width: 20,
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false,
        width: 80,
      },
    ],
    csvFields: {
      Date: 'date',
      App: 'displayAppName',
      'Store Name': 'storeName',
      Location: 'location',
      'Star Rating': 'rating',
      Comment: 'comment',
      Reply: 'developerReply',
      'Assigned Agent': 'assignedAgent.agentName',
      Replied: 'isReplied',
    },
  }),

  computed: {
    ...mapState(['reviews', 'isLoading', 'apps', 'agents']),
    modalHeader() {
      return this.overlayType === 'comment' ? 'Comment:' : this.overlayType === 'reply' ? 'Reply:' : '';
    },
  },

  async created() {
    this.$store.state.pageTitle = 'All Reviews';
    await this.getReviews(this.filters);
    await this.getApps();
    await this.mapAppNames();
    await this.getAgents();
    this.mapAgents();
  },

  watch: {
    filters: {
      async handler(oldValue, newValue) {
        await this.getReviews(newValue);
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions(['getReviews', 'getApps', 'getAgents']),
    mapAppNames() {
      this.appFilter = this.apps.map((item) => {
        return {
          text: item.displayAppName,
          value: item.appName,
        };
      });
      this.appFilter.unshift({ text: 'All', value: null });
    },
    mapAgents() {
      this.selectAgents = this.agents.map((item) => {
        return {
          text: `${item.name} - ${item.email}`,
          value: item.email,
        };
      });
    },
    openComment(type, comment) {
      this.overlay = !this.overlay;
      this.overlayType = type;
      this.comment = comment;
    },
    openModal(type, reviewId) {
      this.overlay = !this.overlay;
      this.overlayType = type;
      this.assignAgentURL = `/ha.api/v1/reviews/assign-agent-to-review/${reviewId}`;
    },
    pickUpAgentData(email) {
      const agent = this.agents.find((item) => item.email === email);
      this.assignAgentData.agentName = agent.name;
      this.assignAgentData.agentEmail = agent.email;
      this.assignAgentData.agentId = agent._id;
    },
    async assignAgentHandler() {
      await axios.patch(this.assignAgentURL, { assignAgentData: this.assignAgentData });
      this.overlay = !this.overlay;
      this.selectAgent = null;
    },
    redirectToShopify(reviewId) {
      window.open(`https://apps.shopify.com/partner/reviews/${reviewId}`);
    },
  },
};
</script>

<style scoped>
.max-width {
  max-width: 2000px;
  width: 98%;
  margin-inline: auto;
}

.search {
  max-width: 400px !important;
}

.selects {
  max-width: 240px !important;
}
</style>
