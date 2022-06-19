import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        reviews: [],
    },
    getters: {
        allReviews: (state) => state.reviews,
    },
    mutations: {
        setReviews: (state, reviews) => (state.reviews = reviews),
    },
    actions: {
        async getReviews({ commit }) {
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
            commit('setReviews', response.data)
        },
    },
    modules: {},
})
