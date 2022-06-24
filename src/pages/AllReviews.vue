<template>
    <v-container>
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
                ></v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AllReviews',

    data: () => ({
        search: '',
        headers: [
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
                text: 'Star Rating',
                value: 'rating',
                width: 120,
            },
            {
                text: 'Comment',
                value: 'comment',
                sortable: false,
            },
            {
                text: 'Location',
                value: 'location',
                sortable: false,
                align: 'right',
            },
            {
                text: 'Date',
                value: 'date',
                align: 'right',
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
