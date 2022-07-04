<template>
  <v-card elevation="3" shaped height="100%">
    <template v-if="!isLoading">
      <v-card-title>
        <v-card :color="color" class="pa-5">
          <v-icon size="50" color="#fff">{{ icon }}</v-icon>
        </v-card>
        <v-spacer></v-spacer>
        <div>
          <v-card-subtitle>{{ title }}</v-card-subtitle>
          <v-card-title class="text-h4">{{ formatNumber(number) }}</v-card-title>
        </div>
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
export default {
  name: 'ChartWidget',

  props: {
    title: String,
    number: Number,
    isLoading: Boolean,
    icon: String,
    color: String,
  },

  methods: {
    formatNumber(num) {
      return this.number ? num.toLocaleString() : 0;
    },
  },
};
</script>
