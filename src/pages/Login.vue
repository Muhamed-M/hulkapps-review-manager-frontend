<template>
  <v-container class="center">
    <div v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <v-card v-else max-width="600px" class="mx-auto">
      <v-form>
        <v-container>
          <img src="../assets/hulk-logo.png" alt="logo" width="70px" class="d-block mx-auto my-3" />
          <h1 class="text-center my-3">LOG IN</h1>
          <v-row @keypress.enter="logInAndRedirect">
            <v-col cols="12">
              <v-text-field v-model="email" type="email" label="Email" outlined shaped hide-details></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="password"
                type="password"
                label="Password"
                outlined
                shaped
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-btn color="success" tile width="100%" class="my-3 py-6" @click="logInAndRedirect">Log In</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginPage',

  data: () => ({
    email: '',
    password: '',
  }),

  computed: {
    ...mapState(['isLoading']),
  },

  methods: {
    ...mapActions(['login']),
    logInAndRedirect() {
      this.login({ email: this.email, password: this.password });
    },
  },
};
</script>

<style scoped>
.center {
  min-height: 100%;
  display: grid;
  place-items: center;
}
</style>
