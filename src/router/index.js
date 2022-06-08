import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/index.vue'
import Blockchain from '@/views/Blockchain/index.vue'
import Accounts from '@/views/Accounts/index.vue'
import More from '@/views/More/index.vue'
import Tsx from '@/views/Blockchain/tsx.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/blockchain',
    component:Blockchain
  },
  {
    path:'/accounts',
    component:Accounts
  },
  {
    path:'/more',
    component:More
  },
  {
    path:'/tsx',
    component:Tsx
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
