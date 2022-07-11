<template>
  <v-container class="center">
    <v-card max-width="600px" class="mx-auto">
      <v-form>
        <v-container>
          <v-img src="../assets/hulk-logo.png" alt="logo" width="70px" class="mx-auto my-3" />
          <h1 class="text-center my-3">LOG IN</h1>
          <v-row>
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
import { mapActions } from 'vuex';

export default {
  name: 'LoginPage',

  data: () => ({
    email: '',
    password: '',
  }),

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
