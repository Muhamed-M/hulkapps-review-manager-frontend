<template>
  <v-app dark>
    <v-main>
      <Navigation v-if="$store.state.user" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  components: { Navigation },
  name: 'App',
};
</script>
