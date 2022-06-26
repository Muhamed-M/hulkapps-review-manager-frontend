<template>
    <v-container fluid>
        <v-card class="mt-10">
            <v-card-title>
                <v-card color="#01aaa3" class="py-5 px-10 white--text position">
                    <v-icon size="40" color="#fff">mdi-text-box-multiple-outline</v-icon> REVIEWS ON ALL APPS
                </v-card>
                <v-spacer />
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="allReviews"
                    :items-per-page="10"
                    :search="search"
                    :footer-props="{
                        'items-per-page-options': [10, 25, 50],
                    }"
                >
                    <template #[`item.rating`]="{ item }">
                        <template v-for="i in 5">
                            <v-icon small v-if="i <= item.rating" :key="i">mdi-star</v-icon>
                            <v-icon small v-else :key="i">mdi-star-outline</v-icon>
                        </template>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AllReviews',

    data: () => ({
        isLoading: false,
        search: '',
        headers: [
            {
                text: 'Date',
                value: 'date',
                align: 'left',
                width: 200,
            },
            {
                text: 'App',
                value: 'app',
            },
            {
                text: 'Store Name',
                value: 'storeName',
                sortable: false,
            },
            {
                text: 'Location',
                value: 'location',
                sortable: false,
                width: 200,
            },
            {
                text: 'Star Rating',
                value: 'rating',
                width: 120,
            },
            {
                text: 'Comment',
                value: 'comment',
                sortable: false,
            },
        ],
    }),

    methods: {
        ...mapActions(['getReviews']),
    },

    created() {
        this.getReviews()
    },

    computed: {
        ...mapGetters(['allReviews']),
    },
}
</script>

<style scoped>
@media screen and (min-width: 1290px) {
    .position {
        position: absolute;
        top: -20px;
    }
}
</style>
