import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

Vue.use(Vuex);

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// get user if existing
const user = JSON.parse(localStorage.getItem('user'));

export default new Vuex.Store({
  state: {
    pageTitle: '',
    isLoading: false,
    user: user ? user : null,
    reviews: [],
    apps: [],
    usersList: [],
    agents: [],
  },
  getters: {},
  mutations: {
    setPageTitle: (state, payload) => (state.pageTitle = payload),
    setReviews: (state, payload) => (state.reviews = payload),
    setApps: (state, payload) => (state.apps = payload),
    setAppName: (state, payload) => state.apps.push(payload),
    deleteApp: (state, payload) => (state.apps = state.apps.filter((item) => item._id !== payload)),
    setUser: (state, payload) => (state.user = payload),
    setUsersList: (state, payload) => (state.usersList = payload),
    pushUser: (state, payload) => state.usersList.push(payload),
    deleteUser: (state, payload) => (state.usersList = state.usersList.filter((item) => item._id !== payload)),
    setAgents: (state, payload) => (state.agents = payload),
  },
  actions: {
    changePageTitle({ commit }, title) {
      commit('setPageTitle', title);
    },
    // Scrape newest reviews
    async getNewestReviews() {
      await axios.post('/ha.api/v1/reviews/retrive-newest-reviews');
    },
    // Scrape all reviews
    async getAllReviews() {
      await axios.post('/ha.api/v1/reviews/retrive-reviews');
    },
    // Log in
    async login({ commit }, data) {
      const response = await axios.post('/ha.api/v1/auth/login', {
        email: data.email,
        password: data.password,
      });

      // set user to local storage
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      commit('setUser', response.data);
      router.push('/');
    },
    // Register User
    async register({ commit }, data) {
      const response = await axios.post('/ha.api/v1/auth/register', {
        email: data.email,
        password: data.password,
        name: data.name,
        isAgent: data.isAgent,
      });
      commit('pushUser', response.data.user);
    },
    // Get all reviews
    async getReviews({ commit, state }, data) {
      state.isLoading = true;
      const response = await axios.post('/ha.api/v1/reviews/get-all-reviews', {
        filterRating: data.filterByRating,
        filterApp: data.filterByApp,
        showUnassigned: data.checkboxUnassigned,
        showUnriplied: data.checkboxUnreplied,
      });
      commit('setReviews', response.data.data);
      state.isLoading = false;
    },
    // Get all apps
    async getApps({ commit }) {
      const response = await axios.get('/ha.api/v1/reviews/get-all-apps');
      commit('setApps', response.data.data);
    },
    // Add apps
    async addApp({ commit }, data) {
      const response = await axios.post('/ha.api/v1/reviews/add-app-name', {
        appName: data.appHandler,
        displayAppName: data.appName,
      });
      commit('setAppName', response.data.data);
    },
    // Delete app
    async deleteApp({ commit }, id) {
      await axios.delete(`/ha.api/v1/reviews/delete-app/${id}`);
      commit('deleteApp', id);
    },
    // Get list of all current users
    async getAllUsers({ commit }) {
      const response = await axios.get('/ha.api/v1/users/get-all-users');
      commit('setUsersList', response.data.data);
    },
    // Delete user
    async deleteUser({ commit }, id) {
      await axios.delete(`/ha.api/v1/users/${id}`);
      commit('deleteUser', id);
    },
    async getAgents({ commit }) {
      const response = await axios.get('/ha.api/v1/users/get-all-agents');
      commit('setAgents', response.data.data);
    },
  },
  modules: {},
});
