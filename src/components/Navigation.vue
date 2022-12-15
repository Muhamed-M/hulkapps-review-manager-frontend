<template>
  <div>
    <v-app-bar>
      <v-container fluid class="d-flex align-center">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          <v-toolbar-title>{{ this.$store.state.pageTitle }}</v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
        <img src="../assets/hulk-logo.png" alt="logo" width="50px" />
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="changeTheme()">
          <v-icon>{{ themeIcon }}</v-icon></v-btn
        >
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">HulkApps</v-list-item-title>
          <v-list-item-subtitle>Reviews Manager</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item to="/all-reviews">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>All Reviews</v-list-item-title>
          </v-list-item>

          <v-list-item to="/settings">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Out</v-list-item-title>
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
    group: null
  }),

  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout() {
      this.$store.commit('setUser', null);
      this.$router.push('/login');
      localStorage.removeItem('user');
    }
  },

  computed: {
    themeIcon() {
      return this.$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent';
    }
  }
};
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
