<template>
  <v-app dark>
    <v-main>
      <Navigation v-if="$store.state.user" />
      <router-view />
    </v-main>
    <v-snackbar v-model="$store.state.snackbar" timeout="3000">
      {{ message }}
      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="$store.state.snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Navigation from './components/Navigation.vue';

export default {
  components: { Navigation },
  name: 'App',

  computed: {
    ...mapState(['message'])
  }
};
</script>
