<template>
  <v-container class="my-4">
    <h2 class="mt-3 mb-5 text-uppercase">Reviews of HulkApps on Shopify App Store</h2>
    <v-row>
      <v-col v-for="(chart, i) in charts" :key="i" cols="6" :lg="chart.cols">
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
      <v-col v-for="(table, i) in tableWidgets" :key="i" cols="6">
        <TableWidget
          :title="table.title"
          :icon="table.icon"
          :loading="table.loading"
          :headers="table.headers"
          :tableData="table.tableData"
        />
      </v-col>
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
import TableWidget from '../components/TableWidget.vue';
import axios from 'axios';

export default {
  name: 'DashboardPage',

  components: {
    ChartWidget,
    Growth,
    StarRatingWidget,
    TableWidget,
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
        isLoading: false,
        icon: 'mdi-calendar',
        color: '#a0e6e3',
        cols: 3,
      },
      {
        title: 'This Week',
        number: 0,
        isLoading: false,
        icon: 'mdi-calendar-range',
        color: '#7eccc8',
        cols: 3,
      },
      {
        title: 'This Month',
        number: 0,
        isLoading: false,
        icon: 'mdi-calendar-month',
        color: '#5bbdb8',
        cols: 3,
      },
      {
        title: 'Last Month',
        number: 0,
        isLoading: false,
        icon: 'mdi-calendar-month',
        color: '#01aaa3',
        cols: 3,
      },
      {
        title: 'TOTAL',
        number: 0,
        isLoading: false,
        icon: 'mdi-chart-bar',
        color: '#05938a',
        cols: 4,
      },
    ],
    tableWidgets: [
      {
        title: 'Reviews by App',
        icon: 'mdi-application-cog',
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
        tableData: [],
        loading: false,
      },
      {
        title: 'Broken Down by Agent',
        icon: 'mdi-account',
        headers: [
          {
            text: 'Agent',
            value: 'agentEmail',
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
        tableData: [],
        loading: false,
      },
    ],
  }),

  created() {
    this.getChartsData();
    this.getBrokenByAppData();
    this.getBrokenByAgentData();
    this.getGrowthData();
  },

  methods: {
    async getChartsData() {
      this.charts.forEach((chart) => {
        chart.isLoading = true;
      });
      const response = await axios.get('/ha.api/v1/reviews/get-dashboard-data');
      this.charts.forEach((chart, i) => {
        chart.number = response.data.data[i];
        chart.isLoading = false;
      });
    },
    async getBrokenByAppData() {
      this.tableWidgets[0].loading = true;
      const response = await axios.get('/ha.api/v1/reviews/reviews-per-app');
      this.tableWidgets[0].tableData = response.data.data;
      this.tableWidgets[0].loading = false;
    },
    async getBrokenByAgentData() {
      this.tableWidgets[1].loading = true;
      const response = await axios.get('/ha.api/v1/reviews/reviews-filtered-by-agent');
      this.tableWidgets[1].tableData = response.data.reviews;
      this.tableWidgets[1].loading = false;
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
