import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/index.vue'
import Blockchain from '@/views/Blockchain/index.vue'
import Accounts from '@/views/Accounts/index.vue'
import More from '@/views/More/index.vue'
import Tsx from '@/views/Blockchain/tsx.vue'
import Contracts from '@/views/Contracts/index.vue'
import Addressdetail from '@/views/Accounts/address_detail/index.vue'
import Blockdetail from '@/views/block_detail/index.vue'
import BlockCheck from '@/views/Blockchain/blockcheck.vue'
import Validation from '@/views/validation/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/blockchain',
    component: Blockchain
  },
  {
    path: '/blockcheck',
    component: BlockCheck
  },
  {
    path: '/accounts',
    component: Accounts
  },
  {
    path:'/validation',
    component:Validation
  },
  {
    path: '/more',
    component: More
  },
  {
    path: '/tsx',
    component: Tsx
  },
  {
    path: '/contracts',
    component: Contracts
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/address_detail',
    component: Addressdetail
  },
  {
    path: '/block_detail',
    component: Blockdetail,
    name: 'blockDetail'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
