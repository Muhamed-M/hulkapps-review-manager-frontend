<template>
    <div>
        <v-app-bar dark>
            <v-container class="d-flex align-center">
                <div class="d-flex align-center">
                    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
                    <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="success"> <v-icon class="mr-2">mdi-refresh</v-icon> Refresh </v-btn>
            </v-container>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary dark>
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
    },
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: unset;
}

.v-application .deep-purple--text.text--accent-4 {
    color: unset;
}

.v-application .deep-purple--text {
    color: unset;
}
</style>
