import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

Vue.config.productionTip = false;
const vuetify = new Vuetify({
  theme: { dark: false },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
