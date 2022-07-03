const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: ['vuetify'],
    devServer: {
        proxy: 'https://reviews-scraper-api.herokuapp.com',
    },
})
