const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: '',
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }
});
