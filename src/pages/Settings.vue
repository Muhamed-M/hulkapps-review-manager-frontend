<template>
    <v-container class="my-2">
        <!-- MANULLY UPDATE DATA SECTION START -->
        <v-row class="my-4">
            <v-col cols="4">
                <h2 class="text-uppercase">Update Data</h2>
                <h4>Manually scrape data.</h4>
            </v-col>
            <v-col cols="8" class="text-right" align-self="center">
                <v-btn color="primary" class="mr-4 py-6 px-7" @click="getNewestReviews()">
                    <v-icon class="mr-2">mdi-refresh</v-icon> Get Newest Data
                </v-btn>
                <v-btn color="success" class="py-6 px-7">
                    <v-icon class="mr-2">mdi-refresh</v-icon> Get All Data
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="my-6"></v-divider>
        <!-- MANULLY UPDATE DATA SECTION END -->

        <!-- ADD APPS SECTION START -->
        <v-row>
            <v-col cols="6">
                <h2 class="text-uppercase">Add Apps</h2>
                <h4>Add apps that you want to see reviews from.</h4>
            </v-col>
            <v-col cols="6" class="text-right">
                <v-btn color="success" tile class="py-6 px-10" @click="openModal('addApp')">Add App</v-btn>
            </v-col>
        </v-row>
        <v-card class="my-5" shaped>
            <v-card-title>
                CURRENT APPS
                <v-spacer></v-spacer>
                Quantity: {{ apps.length }}
            </v-card-title>
            <v-data-table
                :headers="appsTableHeaders"
                :items="apps"
                :items-per-page="10"
                :footer-props="{
                    'items-per-page-options': [5, 10, 25],
                }"
            >
                <template #[`item.appPhotoUrl`]="{ item }">
                    <img v-if="item.appPhotoUrl" width="50px" class="mt-2" :src="item.appPhotoUrl" alt="App Icon" />
                </template>

                <template #[`item.actions`]="{ item }">
                    <v-btn color="error" fab dark small depressed @click="deleteApp(item.appHandler)"
                        ><v-icon>mdi-delete</v-icon></v-btn
                    >
                </template>
            </v-data-table>
        </v-card>
        <v-divider class="my-6"></v-divider>
        <!-- ADD APPS SECTION END -->

        <!-- REGISTER NEW USER START -->
        <v-row>
            <v-col cols="6">
                <h2 class="text-uppercase">REGISTER NEW USER</h2>
                <h4>Add people you want to have access to the app.</h4>
            </v-col>
            <v-col cols="6" class="text-right">
                <v-btn color="success" tile class="py-6 px-10" @click="openModal('addUser')">Add New User</v-btn>
            </v-col>
        </v-row>

        <v-card class="my-5" shaped>
            <v-card-title>
                CURRENT USERS
                <v-spacer></v-spacer>
                Quantity: {{ 0 }}
            </v-card-title>
            <v-data-table
                :headers="usersTableHeaders"
                :items-per-page="10"
                :footer-props="{
                    'items-per-page-options': [5, 10, 25],
                }"
            >
            </v-data-table>
        </v-card>
        <!-- REGISTER NEW USER END -->

        <!-- MODALS START -->
        <v-overlay :value="overlay">
            <!-- ADD APP MODAL START -->
            <v-sheet v-if="overlayType === 'addApp'" width="500px" min-height="400px" class="pa-4" rounded light>
                <v-form class="pa-4 mt-10">
                    <h2 class="text-uppercase mb-4">Add app name and app handle</h2>
                    <v-text-field
                        v-model="appName"
                        label="Enter App Name"
                        type="text"
                        outlined
                        clearable
                        hide-details
                        class="mx-auto mb-5"
                    ></v-text-field>
                    <v-text-field
                        v-model="appHandler"
                        label="Enter App Handler"
                        type="text"
                        outlined
                        clearable
                        hide-details
                        class="mx-auto"
                    ></v-text-field>
                </v-form>
                <v-row class="pa-7">
                    <v-btn color="success" @click="addAppHandler()">Add</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="overlay = !overlay">Cancel</v-btn>
                </v-row>
            </v-sheet>
            <!-- ADD APP MODAL END -->

            <!-- REGISTER USER MODAL START -->
            <v-sheet v-if="overlayType === 'addUser'" width="500px" min-height="400px" class="pa-4" rounded light>
                <v-form class="pa-4">
                    <h2 class="text-uppercase mb-4">Register User</h2>
                    <v-text-field
                        v-model="name"
                        label="Enter User Name"
                        type="text"
                        outlined
                        clearable
                        hide-details
                        class="mx-auto mb-5"
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        label="Enter Email"
                        type="email"
                        outlined
                        clearable
                        hide-details
                        class="mx-auto mb-5"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Enter Password"
                        type="password"
                        outlined
                        clearable
                        hide-details
                        class="mx-auto mb-5"
                    ></v-text-field>
                    <v-checkbox v-model="isAgent" label="Agent"></v-checkbox>
                </v-form>
                <v-row class="pa-7">
                    <v-btn color="success" @click="registrationHandler()">Submit</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="overlay = !overlay">Cancel</v-btn>
                </v-row>
            </v-sheet>
            <!-- REGISTER USER MODAL END -->
        </v-overlay>
        <!-- MODALS END -->
    </v-container>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'SettingsPage',

    data: () => ({
        appName: '',
        appHandler: '',
        name: '',
        email: '',
        password: '',
        isAgent: false,
        overlay: false,
        overlayType: null,
        appsTableHeaders: [
            {
                text: 'App Icon',
                value: 'appPhotoUrl',
                align: 'left',
            },
            {
                text: 'App Name',
                value: 'displayAppName',
                align: 'left',
            },
            {
                text: 'App Handle',
                value: 'appName',
                sortable: false,
            },
            {
                text: 'Actions',
                value: 'actions',
                align: 'right',
                sortable: false,
                width: 120,
            },
        ],
        usersTableHeaders: [
            {
                text: 'Name',
                value: 'name',
                align: 'left',
            },
            {
                text: 'Email',
                value: 'email',
                align: 'left',
            },
            {
                text: 'Agent',
                value: 'isAgent',
                sortable: false,
            },
            {
                text: 'Actions',
                value: 'actions',
                align: 'right',
                sortable: false,
                width: 120,
            },
        ],
    }),

    created() {
        this.getApps()
    },

    computed: {
        ...mapState(['apps']),
    },

    methods: {
        ...mapActions(['getNewestReviews', 'getApps', 'addApp', 'register']),
        addAppHandler() {
            this.addApp({ appName: this.appName, appHandler: this.appHandler })
            this.overlay = !this.overlay
        },
        registrationHandler() {
            this.register({ email: this.email, password: this.password, name: this.name, isAgent: this.isAgent })
            this.overlay = !this.overlay
        },
        async deleteApp(appHandle) {
            const response = await axios.delete('/ha.api/v1/reviews/delete-app', {
                appHandle,
            })
            console.log(response)
        },
        openModal(type) {
            this.overlay = !this.overlay
            this.overlayType = type
        },
    },
}
</script>
