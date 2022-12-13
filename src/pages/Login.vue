<template>
  <v-container class="center">
    <div v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <v-card v-else max-width="600px" class="mx-auto pa-5">
      <v-form>
        <v-container>
          <img src="../assets/hulk-logo.png" alt="logo" width="70px" class="d-block mx-auto mb-3" />
          <h1 class="text-center my-3">LOG IN</h1>
          <v-row @keypress.enter="login({ email, password })">
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
              <v-btn color="success" tile width="100%" class="my-3 py-6" @click="login({ email, password })"
                >Log In
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>

    <v-snackbar v-model="$store.state.snackbar" timeout="3000">
      {{ message }}
      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="$store.state.snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
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
    ...mapState(['isLoading', 'message']),
  },

  methods: {
    ...mapActions(['login']),
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
