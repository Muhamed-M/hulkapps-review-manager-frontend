<template>
  <v-card elevation="3" shaped height="100%" min-height="220px">
    <template v-if="!isLoading">
      <v-card-title>
        <v-card color="#04938a" class="pa-5 mt-3">
          <v-icon size="50" color="#fff">mdi-star</v-icon>
        </v-card>
        <v-row class="ml-8">
          <v-col v-for="(val, prop, i) in reviewsByStarRating" :key="i">
            <v-card-subtitle class="text-h6 d-flex align-center justify-center"
              >{{ i + 1 }}<v-icon>mdi-star</v-icon></v-card-subtitle
            >
            <v-card-title class="text-h5 justify-center">{{ formatNumber(val) }}</v-card-title>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider class="mx-5"></v-divider>
      <v-card-text>
        <v-icon>mdi-clock-time-four-outline</v-icon>
        Updated 1h ago.
      </v-card-text>
    </template>
    <v-sheet v-else height="100%" class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-sheet>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StarRatingWidget',

  data: () => ({
    reviewsByStarRating: {},
    isLoading: false,
  }),

  created() {
    this.getReviewsByStarRating();
  },

  methods: {
    formatNumber(num) {
      return num.toLocaleString();
    },
    async getReviewsByStarRating() {
      this.isLoading = true;
      const response = await axios.get('/ha.api/v1/reviews/reviews-by-star-rating');
      this.reviewsByStarRating = response.data.reviews;
      this.isLoading = false;
    },
  },
};
</script>
