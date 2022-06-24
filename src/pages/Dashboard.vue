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
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
        },
        options: {
            axisX: {
                showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0,
            },
        },
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
