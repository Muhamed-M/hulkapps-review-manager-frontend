<template>
    <v-card elevation="3" shaped>
        <v-card-title>
            <chartist :data="chartData" :options="options" type="Bar" class="chartist"></chartist>
        </v-card-title>
        <v-card-text class="d-flex align-center">
            <v-icon>mdi-poll</v-icon>
            <v-card-title>Growth</v-card-title>
        </v-card-text>
        <v-divider class="mx-5"></v-divider>
        <v-card-text>
            <v-icon>mdi-clock-time-four-outline</v-icon>
            Updated 50mins ago.
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'GrowthChart',

    props: {
        chartData: {
            type: Object,
            default: () => ({}),
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
}
</script>

<style scoped>
.chartist {
    max-height: 220px;
    background-color: #e6e6e6;
    color: #fff;
}
</style>
