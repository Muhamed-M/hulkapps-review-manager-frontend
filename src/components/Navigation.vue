<template>
    <div>
        <v-app-bar>
            <v-container class="d-flex align-center">
                <div class="d-flex align-center">
                    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
                    <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
                </div>
                <v-spacer></v-spacer>
                <img src="../assets/hulk-logo.png" alt="logo" width="50px" />
                <v-spacer></v-spacer>
                <v-btn color="success" class="mr-2"> <v-icon class="mr-2">mdi-refresh</v-icon> Update </v-btn>
                <v-btn color="primary" @click="changeTheme()">
                    <v-icon>{{ themeIcon }}</v-icon></v-btn
                >
            </v-container>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item to="/" @click="changeTitle('Dashboard')">
                        <v-list-item-icon>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/all-reviews" @click="changeTitle('All Reviews')">
                        <v-list-item-icon>
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>All Reviews</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/settings" @click="changeTitle('Settings')">
                        <v-list-item-icon>
                            <v-icon>mdi-cog</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'NavigationComponent',

    data: () => ({
        drawer: false,
        group: null,
        pageTitle: 'Dashboard',
    }),

    methods: {
        changeTitle(title) {
            this.pageTitle = title
        },
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        },
    },

    computed: {
        themeIcon() {
            return this.$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
        },
    },
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: unset;
}

.v-application .deep-purple--text.text--accent-4 {
    color: unset !important;
}

.v-application .deep-purple--text {
    color: unset !important;
}
</style>
