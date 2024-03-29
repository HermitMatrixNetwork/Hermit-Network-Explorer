import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element/index.js'
import 'element-ui/lib/theme-chalk/display.css';
import BasicTitle from '@/components/basicTitle/index.vue'
import SearchBox from '@/components/searchBox/index.vue'
import TableTooltip from '@/components/tableTooltip/index.vue'


Vue.config.productionTip = false
Vue.component('BasicTitle',BasicTitle)
Vue.component('SearchBox',SearchBox)
Vue.component('TableTooltip',TableTooltip)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
