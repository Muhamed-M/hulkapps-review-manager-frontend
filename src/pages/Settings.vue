<template>
    <v-container class="my-2">
        <!-- MANULLY UPDATE DATA SECTION START -->
        <v-row>
            <v-col cols="6">
                <h2 class="text-uppercase">Update Data</h2>
                <h4>Manually scrape data.</h4>
            </v-col>
            <v-col cols="6" class="text-right" align-self="center">
                <v-btn color="success" class="mr-2"> <v-icon class="mr-2">mdi-refresh</v-icon> Refresh </v-btn>
            </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <!-- MANULLY UPDATE DATA SECTION END -->
        <!-- ADD APPS SECTION START -->
        <h2 class="text-uppercase">Add Apps</h2>
        <h4>Add apps that you want to see reviews from.</h4>
        <v-divider class="my-3"></v-divider>
        <v-row class="my-4">
            <v-col cols="12" md="4">
                <v-form class="d-flex align-start">
                    <v-text-field
                        v-model="appName"
                        label="Enter App Name"
                        outlined
                        clearable
                        hide-details
                        class="mr-4"
                    ></v-text-field>
                    <v-btn color="success" @click="addApp(appName)">Add</v-btn>
                </v-form>
            </v-col>
            <v-col cols="12" md="8">
                <v-card max-height="400px" class="overflow-y-auto" tile>
                    <v-list>
                        <v-subheader>
                            CURRENT APPS
                            <v-spacer></v-spacer>
                            Quantity: {{ apps.length }}
                        </v-subheader>
                        <v-list-item v-for="app in apps" :key="app._id">
                            <v-list-item-title class="text-capitalize">
                                {{ app.appName }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <!-- ADD APPS SECTION END -->
        <h2 class="text-uppercase">REGISTER NEW USER</h2>
        <h4>Add people you want to have access to the app.</h4>
        <v-divider class="my-3"></v-divider>
        <v-row class="my-4">
            <v-col cols="12">
                <v-form class="d-flex align-start">
                    <v-text-field
                        v-model="username"
                        label="Enter User Name"
                        type="text"
                        outlined
                        clearable
                        hide-details
                        class="mr-4"
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        label="Enter Email"
                        type="email"
                        outlined
                        clearable
                        hide-details
                        class="mr-4"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Enter Password"
                        type="password"
                        outlined
                        clearable
                        hide-details
                        class="mr-4"
                    ></v-text-field>
                </v-form>
            </v-col>
            <v-col cols="12">
                <v-btn color="success">Register</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'SettingsPage',

    data: () => ({
        appName: '',
        username: '',
        email: '',
        password: '',
    }),

    methods: {
        ...mapActions(['getApps', 'addApp']),
    },

    mounted() {
        this.getApps()
    },

    computed: {
        ...mapState(['apps']),
    },
}
</script>
