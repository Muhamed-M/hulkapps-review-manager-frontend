<template>
  <v-container class="my-2">
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
          'items-per-page-options': [5, 10, 25]
        }"
      >
        <template #[`item.appPhotoUrl`]="{ item }">
          <img v-if="item.appPhotoUrl" width="50px" class="mt-2" :src="item.appPhotoUrl" alt="App Icon" />
        </template>

        <template #[`item.actions`]="{ item }">
          <v-btn color="error" fab dark x-small depressed @click="deleteApp(item._id)"
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
        Quantity: {{ usersList.length }}
      </v-card-title>
      <v-data-table
        :headers="usersTableHeaders"
        :items="usersList"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [5, 10, 25]
        }"
      >
        <template #[`item.isAgent`]="{ item }">
          <ChipFlag :flag="item.isAgent" />
        </template>

        <template #[`item.actions`]="{ item }">
          <v-btn color="error" fab dark x-small depressed @click="deleteUser(item._id)"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card>
    <!-- REGISTER NEW USER END -->

    <!-- MODALS START -->
    <v-dialog v-model="modal" width="500">
      <!-- ADD APP MODAL START -->
      <v-card v-if="modalType === 'addApp'">
        <v-card-title class="text-h5 primary white--text mb-6 d-flex justify-space-between">
          <h3 class="text-upperacse">Add app</h3>
          <v-btn icon @click="modal = !modal"><v-icon color="white">mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
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
            label="Enter App Handle"
            type="text"
            outlined
            clearable
            hide-details
            class="mx-auto"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="px-6 pb-5">
          <v-btn color="error" @click="modal = !modal">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="addAppHandler()">Add</v-btn>
        </v-card-actions>
      </v-card>
      <!-- ADD APP MODAL END -->

      <!-- REGISTER USER MODAL START -->
      <v-card v-if="modalType === 'addUser'">
        <v-card-title class="text-h5 primary white--text mb-6 d-flex justify-space-between">
          <h3 class="text-upperacse">Register User</h3>
          <v-btn icon @click="modal = !modal"><v-icon color="white">mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
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
        </v-card-text>

        <v-card-actions class="px-6 pb-5">
          <v-btn color="error" @click="modal = !modal">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="registrationHandler()">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <!-- REGISTER USER MODAL END -->
    </v-dialog>
    <!-- MODALS END -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SettingsPage',

  data: () => ({
    appName: '',
    appHandler: '',
    name: '',
    email: '',
    password: '',
    isAgent: false,
    modal: false,
    modalType: null,
    appsTableHeaders: [
      {
        text: 'App Icon',
        value: 'appPhotoUrl',
        align: 'left'
      },
      {
        text: 'App Name',
        value: 'displayAppName',
        align: 'left'
      },
      {
        text: 'App Handle',
        value: 'appName',
        sortable: false
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'right',
        sortable: false,
        width: 120
      }
    ],
    usersTableHeaders: [
      {
        text: 'Name',
        value: 'name',
        align: 'left'
      },
      {
        text: 'Email',
        value: 'email',
        align: 'left'
      },
      {
        text: 'Agent',
        value: 'isAgent',
        sortable: false
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'right',
        sortable: false,
        width: 120
      }
    ]
  }),

  created() {
    this.$store.state.pageTitle = 'Settings';
    this.getApps();
    this.getAllUsers();
  },

  computed: {
    ...mapState(['apps', 'usersList'])
  },

  methods: {
    ...mapActions(['getApps', 'addApp', 'deleteApp', 'register', 'getAllUsers', 'deleteUser']),
    addAppHandler() {
      this.addApp({ appName: this.appName, appHandler: this.appHandler });
      this.modal = !this.modal;
    },
    registrationHandler() {
      this.register({ email: this.email, password: this.password, name: this.name, isAgent: this.isAgent });
      this.modal = !this.modal;
    },
    openModal(type) {
      this.modal = !this.modal;
      this.modalType = type;
    }
  }
};
</script>
