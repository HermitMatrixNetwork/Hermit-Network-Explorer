import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element/index.js'
import 'element-ui/lib/theme-chalk/display.css';
import BasicTitle from '@/components/basicTitle/index.vue'


Vue.config.productionTip = false
Vue.component('BasicTitle',BasicTitle)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
