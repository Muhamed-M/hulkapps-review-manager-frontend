import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../pages/Dashboard.vue'),
        // if user is not authenticated redirect to login page
        beforeEnter: (to, from, next) => {
            if (!store.state.user) {
                next('/login')
            } else {
                next()
            }
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/LogIn.vue'),
        // if user is authenticated prevent from reaching login page
        beforeEnter: (to, from, next) => {
            if (store.state.user) {
                next('/')
            } else {
                next()
            }
        },
    },
    {
        path: '/all-reviews',
        name: 'allReviews',
        component: () => import('../pages/AllReviews.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user) {
                next('/login')
            } else {
                next()
            }
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../pages/Settings.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.state.user) {
                next('/login')
            } else {
                next()
            }
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
