<template>
  <v-container class="my-4">
    <h2 class="mt-3 mb-5 text-uppercase">Reviews of HulkApps on Shopify App Store</h2>
    <v-row>
      <v-col v-for="(chart, i) in charts" :key="i" cols="6" lg="4">
        <ChartWidget
          :title="chart.title"
          :number="chart.number"
          :isLoading="chart.isLoading"
          :icon="chart.icon"
          :color="chart.color"
        />
      </v-col>
      <v-col cols="12" lg="8">
        <StarRatingWidget />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Growth :chartData="chartData" :chartOptions="chartOptions" :chartLoading="chartLoading" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon';
import ChartWidget from '../components/ChartWidget.vue';
import Growth from '../components/Growth.vue';
import StarRatingWidget from '../components/StarRatingWidget.vue';
import axios from 'axios';

export default {
  name: 'DashboardPage',

  components: {
    ChartWidget,
    Growth,
    StarRatingWidget,
  },

  data: () => ({
    chartLoading: false,
    chartData: {
      labels: [
        DateTime.local().minus({ months: 11 }).monthShort,
        DateTime.local().minus({ months: 10 }).monthShort,
        DateTime.local().minus({ months: 9 }).monthShort,
        DateTime.local().minus({ months: 8 }).monthShort,
        DateTime.local().minus({ months: 7 }).monthShort,
        DateTime.local().minus({ months: 6 }).monthShort,
        DateTime.local().minus({ months: 5 }).monthShort,
        DateTime.local().minus({ months: 4 }).monthShort,
        DateTime.local().minus({ months: 3 }).monthShort,
        DateTime.local().minus({ months: 2 }).monthShort,
        DateTime.local().minus({ months: 1 }).monthShort,
        DateTime.local().monthShort,
      ],
      datasets: [
        {
          data: [],
          backgroundColor: '#01a9a2',
        },
      ],
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: true,
    },
    charts: [
      {
        title: 'Today',
        number: 0,
        icon: 'mdi-calendar',
        color: '#a0e6e3',
      },
      {
        title: 'This Week',
        number: 0,
        icon: 'mdi-calendar-range',
        color: '#7eccc8',
      },
      {
        title: 'This Month',
        number: 0,
        icon: 'mdi-calendar-month',
        color: '#5bbdb8',
      },
      {
        title: 'Last Month',
        number: 0,
        icon: 'mdi-calendar-month',
        color: '#01aaa3',
      },
      {
        title: 'TOTAL',
        number: 0,
        isLoading: false,
        icon: 'mdi-chart-bar',
        color: '#05938a',
      },
    ],
  }),

  created() {
    this.getTotalReviews();
    this.getTodayTotalReviews();
    this.getThisWeekReviews();
    this.getThisAndLastMonth();
    this.getGrowthData();
  },

  methods: {
    async getTodayTotalReviews() {
      this.charts[0].isLoading = true;
      const response = await axios.get('/ha.api/v1/reviews/get-number-of-reviews-today');
      this.charts[0].number = response.data.data;
      this.charts[0].isLoading = false;
    },
    async getThisWeekReviews() {
      this.charts[1].isLoading = true;
      const response = await axios.get('/ha.api/v1/reviews/get-this-week-reviews');
      this.charts[1].number = response.data.data;
      this.charts[1].isLoading = false;
    },
    async getTotalReviews() {
      this.charts[4].isLoading = true;
      const response = await axios.get('/ha.api/v1/reviews/get-number-of-reviews');
      this.charts[4].number = response.data.data;
      this.charts[4].isLoading = false;
    },
    async getThisAndLastMonth() {
      this.charts[2].isLoading = true;
      this.charts[3].isLoading = true;
      const response = await axios.get('/ha.api/v1/reviews/this-month-last-month');
      this.charts[2].number = response.data.data.thisMonthReviews;
      this.charts[3].number = response.data.data.lastMonthReviews;
      this.charts[2].isLoading = false;
      this.charts[3].isLoading = false;
    },
    async getGrowthData() {
      this.chartLoading = true;
      const response = await axios.get('/ha.api/v1/reviews/get-last-12');
      this.chartData.datasets[0].data = response.data.res;
      this.chartLoading = false;
    },
  },
};
</script>
