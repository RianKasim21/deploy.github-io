const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/soal.github.io/' // Ganti dengan nama repository Anda
    : '/'
})
