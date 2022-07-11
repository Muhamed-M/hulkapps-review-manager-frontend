<template>
  <v-card elevation="3" shaped width="100%" min-height="200px" height="100%">
    <v-card-title>
      <v-icon>mdi-application-cog</v-icon>
      <v-card-title>Reviews by App</v-card-title>
    </v-card-title>
    <template v-if="!loading">
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="tableData"
          items-per-page="5"
          :footer-props="{
            disableItemsPerPage: true,
          }"
        ></v-data-table>
      </v-card-text>
      <v-divider class="mx-5"></v-divider>
      <v-card-text>
        <v-icon>mdi-clock-time-four-outline</v-icon>
        Updated 50mins ago.
      </v-card-text>
    </template>
    <v-card-text v-else>
      <v-sheet height="100%" class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReviewsByApp',

  data: () => ({
    loading: false,
    tableData: [],
    headers: [
      {
        text: 'App',
        value: 'appName',
        align: 'left',
      },
      {
        text: 'This Month',
        value: 'thisMonth',
        sortable: false,
      },
      {
        text: 'Last Month',
        value: 'lastMonth',
        sortable: false,
      },
      {
        text: 'Total',
        value: 'numberOfReviews',
        align: 'right',
        sortable: false,
      },
    ],
  }),

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.loading = true;
      const response = await axios.get('/ha.api/v1/reviews/reviews-per-app');
      this.tableData = response.data.data;
      this.loading = false;
    },
  },
};
</script>
