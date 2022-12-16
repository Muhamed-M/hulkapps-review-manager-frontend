import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
Vue.use(Vuex);

// proxy
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const now = Date.now();
// get user if existing
const user = JSON.parse(localStorage.getItem('user'));
// If session expired remove user
if (user?.expiresOn && user?.expiresOn < now) {
  localStorage.removeItem('user');
}

export default new Vuex.Store({
  state: {
    pageTitle: '',
    isLoading: false,
    snackbar: false,
    message: '',
    user: user ? user : null,
    reviews: [],
    reviewsCount: null,
    apps: [],
    usersList: [],
    agents: []
  },
  getters: {},
  mutations: {
    setPageTitle: (state, payload) => (state.pageTitle = payload),
    setReviews: (state, payload) => (state.reviews = payload),
    setReviewsCount: (state, payload) => (state.reviewsCount = payload),
    setApps: (state, payload) => (state.apps = payload),
    setAppName: (state, payload) => state.apps.push(payload),
    deleteApp: (state, payload) => (state.apps = state.apps.filter((item) => item._id !== payload)),
    setUser: (state, payload) => (state.user = payload),
    setUsersList: (state, payload) => (state.usersList = payload),
    pushUser: (state, payload) => state.usersList.push(payload),
    deleteUser: (state, payload) => (state.usersList = state.usersList.filter((item) => item._id !== payload)),
    setAgents: (state, payload) => (state.agents = payload),
    setSnackbar: (state, payload) => (state.snackbar = payload)
  },
  actions: {
    changePageTitle({ commit }, title) {
      commit('setPageTitle', title);
    },
    // Log in
    async login({ commit }, data) {
      try {
        const { email, password, rememberMe } = data;
        // If no data display message and return
        if (!email || !password) {
          commit('setSnackbar', true);
          this.state.message = 'You must enter email and password!';
          return;
        }

        if (this.state.isLoading) return;
        this.state.isLoading = true;
        const response = await axios.post('/ha.api/v1/auth/login', {
          email,
          password
        });

        // set user to local storage with expiration of 7 days
        if (response.data && rememberMe) {
          localStorage.setItem('user', JSON.stringify({ ...response.data, expiresOn: now + 1000 * 60 * 60 * 24 * 7 }));
        }

        commit('setUser', response.data);
        router.push('/');
      } catch (error) {
        commit('setSnackbar', true);
        this.state.message = 'Invalid credentials!';
      } finally {
        this.state.isLoading = false;
      }
    },
    // Register User
    async register({ commit }, data) {
      const response = await axios.post('/ha.api/v1/auth/register', {
        email: data.email,
        password: data.password,
        name: data.name,
        isAgent: data.isAgent
      });
      commit('pushUser', response.data.user);
    },
    // Get all reviews
    async getReviews({ commit, state }, data) {
      try {
        this.state.isLoading = true;
        const response = await axios.post('/ha.api/v1/cx-manager/get-all-reviews', {
          filterRating: data.filterByRating,
          filterApp: data.filterByApp,
          showUnassigned: data.checkboxUnassigned,
          showUnreplied: data.checkboxUnreplied,
          options: data.options,
          searchQuery: data.searchQuery || null
        });
        commit('setReviews', response.data.data);
        commit('setReviewsCount', response.data.count);
      } catch (error) {
        console.log(error);
      } finally {
        this.state.isLoading = false;
      }
    },
    // Get all apps
    async getApps({ commit }) {
      const response = await axios.get('/ha.api/v1/cx-manager/get-all-apps');
      commit('setApps', response.data.data);
    },
    // Add apps
    async addApp({ commit }, data) {
      const response = await axios.post('/ha.api/v1/cx-manager/add-app-name', {
        appName: data.appHandler,
        displayAppName: data.appName
      });
      commit('setAppName', response.data.data);
    },
    // Delete app
    async deleteApp({ commit }, id) {
      await axios.delete(`/ha.api/v1/cx-manager/delete-app/${id}`);
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
    }
  },
  modules: {}
});
