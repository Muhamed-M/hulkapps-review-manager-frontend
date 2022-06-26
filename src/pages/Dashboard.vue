<template>
    <v-container>
        <h2 class="mt-3 mb-5 text-uppercase">Reviews of HulkApps on Shopify App Store</h2>
        <v-row>
            <v-col v-for="(chart, i) in charts" :key="i" cols="6" lg="4">
                <ChartWidget :title="chart.title" :number="chart.number" :icon="chart.icon" :color="chart.color" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <Growth :chartData="chartData" :options="options" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ChartWidget from '../components/ChartWidget.vue'
import Growth from '../components/Growth.vue'

export default {
    name: 'DashboardPages',

    components: {
        ChartWidget,
        Growth,
    },

    data: () => ({
        chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [[20, 74, 45, 20, 60, 130, 38, 43, 46, 101, 92, 120]],
        },
        options: {
            axisX: {
                showGrid: false,
            },
            low: 0,
            high: 200,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0,
            },
        },
        charts: [
            {
                title: 'Today',
                number: 4,
                icon: 'mdi-calendar',
                color: '#a0e6e3',
            },
            {
                title: 'This Month',
                number: 23,
                icon: 'mdi-calendar-month',
                color: '#5bbdb8',
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
