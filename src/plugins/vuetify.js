import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
Vue.use(Vuetify);

// Set theme based on system preference
let isDark;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  isDark = true;
}

export default new Vuetify({
  theme: { dark: isDark }
});
