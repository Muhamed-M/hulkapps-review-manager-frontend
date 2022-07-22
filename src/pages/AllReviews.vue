<template>
  <v-container fluid class="max-width">
    <v-card class="mt-10">
      <v-card-title>
        <v-select
          :items="appFilter"
          v-model="filterByApp"
          outlined
          label="Filter By Apps"
          hide-details
          class="selects mr-4"
        ></v-select>
        <v-select
          :items="ratingFilter"
          v-model="filterByRating"
          outlined
          label="Filter By Rating"
          hide-details
          class="selects mr-4"
        ></v-select>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="search"
        ></v-text-field>
        <v-spacer />
        <v-btn color="success" class="ml-8">
          <v-icon class="mr-2">mdi-download</v-icon>
          <download-excel :data="reviews" :fields="csvFields" name="All-Reviews.xls" type="xls"
            >Export Table</download-excel
          >
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="reviews"
          :items-per-page="10"
          :search="search"
          :loading="isLoading"
          loading-text="Loading..."
          :footer-props="{
            'items-per-page-options': [10, 25, 50],
          }"
        >
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
            {{ item.comment.length > 20 ? item.comment.slice(0, 20) + '...' : item.comment }}
          </template>

          <template #[`item.isReplied`]="{ item }">
            <ChipFlag :flag="item.isReplied" />
          </template>

          <template #[`item.actions`]="{ item }">
            <div class="d-inline-flex">
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
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- MODALS START -->
    <v-overlay :value="overlay">
      <!-- READ COMMENT MODAL START -->
      <v-sheet v-if="overlayType === 'comment'" max-width="500px" min-height="400px" class="pa-4" rounded light>
        <v-row class="ma-4" justify="space-between">
          <h3>Comment:</h3>
          <v-btn icon @click="overlay = !overlay"><v-icon>mdi-close</v-icon></v-btn>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <div class="ma-2">{{ comment }}</div>
      </v-sheet>
      <!-- READ COMMENT MODAL END -->

      <!-- ASSIGN AGENT MODAL START -->
      <v-sheet v-if="overlayType === 'assignAgent'" max-width="500px" min-height="400px" class="pa-4" rounded light>
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
    filterByApp: null,
    filterByRating: null,
    appFilter: [],
    selectAgents: [],
    selectAgent: null,
    assignAgentURL: '/ha.api/v1/reviews/assign-agent-to-review/',
    assignAgentData: {
      agentName: '',
      agentEmail: '',
      agentId: '',
    },
    ratingFilter: [
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
        width: 190,
      },
      {
        text: 'App',
        value: 'app',
        width: 200,
      },
      {
        text: 'Store Name',
        value: 'storeName',
        sortable: false,
        width: 200,
      },
      {
        text: 'Location',
        value: 'location',
        sortable: false,
        width: 200,
      },
      {
        text: 'Star Rating',
        value: 'rating',
        width: 120,
      },
      {
        text: 'Comment',
        value: 'comment',
        sortable: false,
        align: 'left',
        width: 250,
      },
      {
        text: 'Replied',
        value: 'isReplied',
        align: 'right',
        sortable: false,
        width: 20,
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'right',
        sortable: false,
        width: 70,
      },
    ],
    csvFields: {
      Date: 'date',
      App: 'app',
      'Store Name': 'storeName',
      Location: 'location',
      'Star Rating': 'rating',
      Comment: 'comment',
      Replied: 'isReplied',
    },
  }),

  computed: {
    ...mapState(['reviews', 'isLoading', 'apps', 'agents']),
  },

  async created() {
    await this.getReviews();
    await this.getApps();
    await this.mapAppNames();
    await this.getAgents();
    this.mapAgentEmails();
  },

  watch: {
    filterByApp() {
      const data = {
        type: 'app',
        filter: this.filterByApp,
      };
      this.getReviewsFilter(data);
    },

    filterByRating() {
      const data = {
        type: 'rating',
        filter: this.filterByRating,
      };
      this.getReviewsFilter(data);
    },
  },

  methods: {
    ...mapActions(['getReviews', 'getApps', 'getReviewsFilter', 'getAgents']),
    mapAppNames() {
      this.appFilter = this.apps.map((item) => item.appName);
    },
    mapAgentEmails() {
      this.selectAgents = this.agents.map((item) => item.email);
    },
    openComment(type, comment) {
      this.overlay = !this.overlay;
      this.overlayType = type;
      this.comment = comment;
    },
    openModal(type, reviewId) {
      this.overlay = !this.overlay;
      this.overlayType = type;
      this.assignAgentURL = this.assignAgentURL + reviewId;
    },
    pickUpAgentData(email) {
      const agent = this.agents.find((item) => item.email === email);
      this.assignAgentData.agentName = agent.name;
      this.assignAgentData.agentEmail = agent.email;
      this.assignAgentData.agentId = agent._id;
    },
    async assignAgentHandler() {
      const response = await axios.patch(this.assignAgentURL, this.data);
      console.log(response);
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
