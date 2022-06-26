import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        reviews: [],
        apps: [],
    },
    getters: {},
    mutations: {
        setReviews: (state, payload) => (state.reviews = payload),
        setApps: (state, payload) => (state.apps = payload),
        newAppName: (state, payload) => state.apps.push(payload),
    },
    actions: {
        async getReviews({ commit }) {
            const response = await axios.get('http://localhost:5000/ha.api/v1/reviews/get-all-reviews')
            commit('setReviews', response.data.data)
        },
        async getApps({ commit }) {
            const response = await axios.get('http://localhost:5000/ha.api/v1/reviews/get-all-apps')
            commit('setApps', response.data.data)
        },
        async addApp({ commit }, appName) {
            const response = await axios.post('http://localhost:5000/ha.api/v1/reviews/add-app-name', {
                appName,
            })
            commit('newAppName', response.data.data)
        },
    },
    modules: {},
})
