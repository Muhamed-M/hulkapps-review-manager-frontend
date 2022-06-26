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

<style>
.chartist {
    max-height: 230px;
    background-color: #00cae3;
    border-radius: 10px;
}

.ct-label {
    color: #fff !important;
    font-size: 0.875rem !important;
    font-weight: 300 !important;
}

.ct-grid {
    stroke: hsla(0, 0%, 100%, 0.2) !important;
}

.ct-series-a .ct-bar,
.ct-series-a .ct-line,
.ct-series-a .ct-point,
.ct-series-a .ct-slice-donut {
    stroke: rgba(255, 255, 255, 0.8) !important;
    stroke-width: 20px;
}

.ct-series-a .ct-slice-pie,
.ct-series-a .ct-area {
    fill: rgba(255, 255, 255, 0.4) !important;
}
</style>
