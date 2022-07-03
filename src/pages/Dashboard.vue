<template>
    <v-container class="my-4">
        <h2 class="mt-3 mb-5 text-uppercase">Reviews of HulkApps on Shopify App Store</h2>
        <v-row>
            <v-col v-for="(chart, i) in charts" :key="i" cols="6" lg="4">
                <ChartWidget :title="chart.title" :number="chart.number" :icon="chart.icon" :color="chart.color" />
            </v-col>
            <v-col cols="12" lg="8">
                <StarRatingWidget />
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
import { DateTime } from 'luxon'
import ChartWidget from '../components/ChartWidget.vue'
import Growth from '../components/Growth.vue'
import StarRatingWidget from '../components/StarRatingWidget.vue'
// import axios from 'axios'

export default {
    name: 'DashboardPage',

    components: {
        ChartWidget,
        Growth,
        StarRatingWidget,
    },

    data: () => ({
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
                number: 0,
                icon: 'mdi-chart-bar',
                color: '#05938a',
            },
        ],
    }),

    /* created() {
        this.getReviewsByStarRating()
    },

    methods: {
        async getReviewsByStarRating() {
            const response = await axios.get('/ha.api/v1/reviews/get-number-of-reviews')
            console.log(response.data.data)
        },
    }, */
}
</script>
