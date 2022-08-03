import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/index.vue'
import Blockchain from '@/views/Blockchain/index.vue'
import Accounts from '@/views/Accounts/index.vue'
import More from '@/views/More/index.vue'
import Tsx from '@/views/Blockchain/tsx.vue'
import Contracts from '@/views/Contracts/index.vue'
import Addressdetail from '@/views/Detail/address_detail/index.vue'
import Blockdetail from '@/views/Detail/block_detail/index.vue'
import Nodedetail from '@/views/Detail/node_detail/index.vue'
import BlockCheck from '@/views/Blockchain/blockcheck.vue'
import Validation from '@/views/validation/index.vue'
import currencyState from '@/views/More/currencyState.vue'
import Govern from '@/views/More/govern.vue'
import Foundation from '@/views/More/foundation.vue'
import Resources from '@/views/resources/index.vue'
import Hashdetail from '@/views/Detail/hash_detail/index.vue'
import PunishmentNode from '@/views/validation/punishmentNode.vue'
import HistoryNode from '@/views/validation/historyNode.vue'

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
    path: '/validation',
    component: Validation
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
    path: '/developapi',
    component: Resources
  },
  {
    path: '/address_detail',
    component: Addressdetail
  },
  {
    path: '/block_detail',
    component: Blockdetail
  },
  {
    path: '/currency_state',
    component: currencyState
  },
  {
    path: '/govern',
    component: Govern
  },
  {
    path: '/foundation',
    component: Foundation
  },
  {
    path: '/hash_detail',
    component: Hashdetail
  },
  {
    path: '/punishmentNode',
    component: PunishmentNode
  },
  {
    path: '/historyNode',
    component: HistoryNode
  },
  {
    path:'/node_detail',
    component:Nodedetail
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{

// })


export default router
