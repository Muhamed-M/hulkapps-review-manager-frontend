<template>
    <v-container class="my-4">
        <h2 class="mt-3 mb-5 text-uppercase">Reviews of HulkApps on Shopify App Store</h2>
        <v-row>
            <v-col v-for="(chart, i) in charts" :key="i" cols="6" lg="4">
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
import axios from 'axios'

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
            series: [],
            isLoading: false,
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
                number: 0,
                icon: 'mdi-calendar',
                color: '#a0e6e3',
            },
            {
                title: 'This Month',
                number: 0,
                icon: 'mdi-calendar-month',
                color: '#5bbdb8',
            },
            {
                title: 'Last Month',
                number: 0,
                icon: 'mdi-calendar-month',
                color: '#01aaa3',
            },
            {
                title: 'TOTAL',
                number: 0,
                isLoading: false,
                icon: 'mdi-chart-bar',
                color: '#05938a',
            },
        ],
    }),

    created() {
        this.getTotalReviews()
        this.getThisAndLastMonth()
        this.getGrowthData()
    },

    methods: {
        async getTotalReviews() {
            this.charts[3].isLoading = true
            const response = await axios.get('/ha.api/v1/reviews/get-number-of-reviews')
            this.charts[3].number = response.data.data
            this.charts[3].isLoading = false
        },
        async getThisAndLastMonth() {
            const response = await axios.get('/ha.api/v1/reviews/this-month-last-month')
            this.charts[1].number = response.data.data.thisMonthReviews
            this.charts[2].number = response.data.data.lastMonthReviews
        },
        async getGrowthData() {
            this.chartData.isLoading = true
            const response = await axios.get('/ha.api/v1/reviews/get-last-12')
            console.log(response.data.res)
            this.chartData.series.push(response.data.res)
            this.chartData.isLoading = false
        },
    },
}
</script>
