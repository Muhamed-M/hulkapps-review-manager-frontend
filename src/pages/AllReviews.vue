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

          <template #[`item.isReplied`]="{ item }">
            <ChipFlag :flag="item.isReplied" />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DownloadExcel from 'vue-json-excel';
import ChipFlag from '../components/ChipFlag.vue';

export default {
  name: 'AllReviews',

  components: {
    ChipFlag,
    DownloadExcel,
  },

  data: () => ({
    search: '',
    appFilter: [],
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
    filterByApp: null,
    filterByRating: null,
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
      },
      {
        text: 'Replied',
        value: 'isReplied',
        align: 'right',
        sortable: false,
        width: 20,
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

  methods: {
    ...mapActions(['getReviews', 'getApps', 'getReviewsFilter']),
    mapAppNames() {
      this.appFilter = this.apps.map((item) => item.appName);
    },
  },

  computed: {
    ...mapState(['reviews', 'isLoading', 'apps']),
  },

  async mounted() {
    await this.getReviews();
    await this.getApps();
    this.mapAppNames();
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
};
</script>

<style scoped>
@media screen and (min-width: 1290px) {
  .position {
    position: absolute;
    top: -20px;
  }
}

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
