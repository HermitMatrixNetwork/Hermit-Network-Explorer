const { defineConfig } = require('@vue/cli-service')
const autoprefixer = require('autoprefixer')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  assetsDir:'assets',
  publicPath:'./',
  devServer: {
    port:8888,
    https:false,
    proxy: {  //代理服务器
      '/api': {
        target: 'http://158.247.237.78:8188',
        pathRewrite: { '^/api': '' },
        logLevel: "debug",
        // ws: true,
        changeOrigin: true
      },
      '/upload':{
        target:'http://158.247.237.78:8888',
        pathRewrite: {'^/upload':''},
        logLevel:'debug',
        changeOrigin: true
      },
      '/faucet':{
        target:'http://158.247.237.78',
        pathRewrite: {'^/faucet':''},
        logLevel:'debug',
        changeOrigin: true
      }
    }
  }
})
