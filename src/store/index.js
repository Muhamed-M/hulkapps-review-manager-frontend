import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

// get user if existing
const user = JSON.parse(localStorage.getItem('user'))

export default new Vuex.Store({
    state: {
        user: user ? user : null,
        reviews: [],
        apps: [],
    },
    getters: {},
    mutations: {
        setReviews: (state, payload) => (state.reviews = payload),
        setApps: (state, payload) => (state.apps = payload),
        setAppName: (state, payload) => state.apps.push(payload),
        setUser: (state, payload) => (state.user = payload),
    },
    actions: {
        // Get newest reviews
        async getNewestReviews() {
            const response = await axios.get('http://localhost:5000/ha.api/v1/reviews/retrive-newest-reviews')
            console.log(response)
        },
        // Log in
        async login({ commit }, data) {
            const response = await axios.post('http://localhost:5000/ha.api/v1/auth/login', {
                email: data.email,
                password: data.password,
            })

            // set user to local storage
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            commit('setUser', response.data)
            router.push('/')
        },
        // Get all reviews
        async getReviews({ commit }) {
            const response = await axios.get('http://localhost:5000/ha.api/v1/reviews/get-all-reviews')
            commit('setReviews', response.data.data)
        },
        // Get all apps
        async getApps({ commit }) {
            const response = await axios.get('http://localhost:5000/ha.api/v1/reviews/get-all-apps')
            commit('setApps', response.data.data)
        },
        // Add apps
        async addApp({ commit }, data) {
            const response = await axios.post('http://localhost:5000/ha.api/v1/reviews/add-app-name', {
                appName: data.appName,
                appDisplayName: data.appHandler,
            })
            commit('setAppName', response.data.data)
        },
    },
    modules: {},
})
