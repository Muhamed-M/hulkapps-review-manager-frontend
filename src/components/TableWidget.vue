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
      <v-icon>{{ icon }}</v-icon>
      <v-card-title>{{ title }}</v-card-title>
    </v-card-title>
    <template v-if="!loading">
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="tableData"
          :items-per-page="5"
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

    <v-sheet v-else height="100%" class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: 'ReviewsByApp',

  props: {
    title: String,
    icon: String,
    headers: Array,
    tableData: Array,
    loading: Boolean,
  },
};
</script>
