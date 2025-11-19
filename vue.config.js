/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pingaksh
  Author URL: http://www.themeforest.net/user/Pingaksh
==========================================================================================*/

module.exports = {
  publicPath: '/',
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   }
  // }
}
