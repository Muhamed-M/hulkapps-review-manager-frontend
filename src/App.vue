<template>
    <v-app dark>
        <Navigation />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
    components: { Navigation },
    name: 'App',
}
</script>
