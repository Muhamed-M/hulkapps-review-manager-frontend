<template>
  <v-card
    elevation="3"
    shaped
    width="100%"
    min-height="200px"
    height="100%"
    class="d-flex flex-column justify-space-between"
  >
    <v-card-title>
      <v-icon>mdi-poll</v-icon>
      <v-card-title>Growth</v-card-title>
    </v-card-title>
    <template v-if="!chartLoading">
      <v-card-text>
        <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :plugins="plugins" />
      </v-card-text>
      <div>
        <v-divider class="mx-5"></v-divider>
        <v-card-text>
          <v-icon>mdi-clock-time-four-outline</v-icon>
          Updated 1h ago.
        </v-card-text>
      </div>
    </template>
    <v-card-text v-else>
      <v-sheet height="100%" class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

export default {
  name: 'GrowthChart',

  components: {
    Bar,
  },

  props: {
    chartLoading: {
      type: Boolean,
      default: false,
    },
    chartData: {
      type: Object,
      default: () => ({}),
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
canvas {
  max-height: 280px !important;
}
</style>
