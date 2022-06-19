<template>
    <v-container>
        <h1 class="mt-3 mb-5">Statistics of HulkApps apps on Shopify App Store</h1>
        <v-row>
            <v-col v-for="(chart, i) in charts" :key="i" cols="6" lg="4">
                <ChartWidget :title="chart.title" :number="chart.number" :icon="chart.icon" :color="chart.color" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ChartWidget from '../components/ChartWidget.vue'

export default {
    name: 'DashboardPages',

    components: {
        ChartWidget,
    },

    data: () => ({
        charts: [
            {
                title: 'This Month',
                number: 23,
                icon: 'mdi-calendar-month',
                color: '#a0e6e3',
            },
            {
                title: 'Last Month',
                number: 46,
                icon: 'mdi-calendar-month',
                color: '#01aaa3',
            },
            {
                title: 'TOTAL',
                number: 4390,
                icon: 'mdi-chart-bar',
                color: '#05938a',
            },
        ],
    }),
}
</script>
