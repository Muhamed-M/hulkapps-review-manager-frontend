const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: ['vuetify'],
    devServer: {
        allowedHosts: ['https://reviews-scraper-api.herokuapp.com'],
    },
})
