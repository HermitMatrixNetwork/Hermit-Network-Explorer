const { defineConfig } = require('@vue/cli-service')
const autoprefixer = require('autoprefixer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  assetsDir: 'assets',
  publicPath: './',
  devServer: {
    port: 8889,
    https: false,
    proxy: {  //代理服务器
      '/api': {
        target: 'https://api.hermit.network:8188',
        pathRewrite: { '^/api': '' },
        logLevel: "debug",
        // ws: true,
        changeOrigin: true
      },
      '/upload': {
        target: 'https://sentinel.hermit.network:2333/api/',
        pathRewrite: { '^/upload': '' },
        logLevel: 'debug',
        changeOrigin: true
      },
      '/faucet': {
        target: 'https://faucet.hermit.network:6666',
        pathRewrite: { '^/faucet': '' },
        logLevel: 'debug',
        changeOrigin: true
      }
    }
  },
  // configureWebpack: (config) => {
  //   config.optimization = {
  //     splitChunks: {
  //       cacheGroups: {
  //         vendor: {
  //           chunks: 'all',
  //           test: /node_modules/,
  //           name: 'vendor',
  //           minChunks: 1,
  //           maxInitialRequests: 5,
  //           minSize: 0,
  //           priority: 100,
  //         },
  //         common: {
  //           chunks: 'all',
  //           test: /[\\/]src[\\/]js[\\/]/,
  //           name: 'common',
  //           minChunks: 2,
  //           maxInitialRequests: 5,
  //           minSize: 0,
  //           priority: 60,
  //         },
  //         styles: {
  //           name: 'styles',
  //           test: /\.(sa|sc|c)ss$/,
  //           chunks: 'all',
  //           enforce: true,
  //         },
  //         runtimeChunk: {
  //           name: 'manifest',
  //         },
  //       },
  //     },
  //   }
  //   // return config
  // },
  // configureWebpack:{
  //   plugins:[
  //     // new CompressionWebpackPlugin(),
  //     // new BundleAnalyzerPlugin()
  //   ],
  // }
})
