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
                text: 'Shop Name',
                value: 'name',
                sortable: false,
            },
            {
                text: 'Star Rating',
                value: 'id',
                width: 100,
            },
            {
                text: 'Review',
                value: 'body',
                sortable: false,
            },
            {
                text: 'Location',
                value: '',
                sortable: false,
                align: 'right',
            },
            {
                text: 'Date',
                value: '',
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
