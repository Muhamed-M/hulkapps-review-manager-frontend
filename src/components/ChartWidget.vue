<template>
    <v-card elevation="3" shaped height="100%">
        <v-card-title>
            <v-card :color="color" class="pa-5">
                <v-icon size="50" color="#fff">{{ icon }}</v-icon>
            </v-card>
            <v-spacer></v-spacer>
            <div>
                <v-card-subtitle>{{ title }}</v-card-subtitle>
                <v-card-title class="text-h4">{{ formatNumber(number) }}</v-card-title>
            </div>
        </v-card-title>
        <v-divider class="mx-5"></v-divider>
        <v-card-text>
            <v-icon>mdi-clock-time-four-outline</v-icon>
            Updated 1h ago.
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'ChartWidget',

    props: {
        title: String,
        number: Number,
        icon: String,
        color: String,
    },

    methods: {
        formatNumber(num) {
            return num.toLocaleString()
        },
    },
}
</script>
