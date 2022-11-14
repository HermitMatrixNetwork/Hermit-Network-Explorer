import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home/index.vue'
// import Blockchain from '@/views/Blockchain/index.vue'
// import Accounts from '@/views/Accounts/accounts.vue'
// import Faucet from '@/views/More/faucet.vue'
// import Tsx from '@/views/Blockchain/tsx.vue'
// import Contracts from '@/views/Contracts/index.vue'
// import Addressdetail from '@/views/Detail/address_detail/index.vue'
// import Blockdetail from '@/views/Detail/block_detail/index.vue'
// import Nodedetail from '@/views/Detail/node_detail/index.vue'
// import BlockCheck from '@/views/Blockchain/blockcheck.vue'
// import Validation from '@/views/validation/index.vue'
// import currencyState from '@/views/More/currencyState.vue'
// import Govern from '@/views/More/govern.vue'
// import Foundation from '@/views/More/foundation.vue'
// import Resources from '@/views/resources/index.vue'
// import Hashdetail from '@/views/Detail/hash_detail/index.vue'
// import PunishmentNode from '@/views/validation/punishmentNode.vue'
// import HistoryNode from '@/views/validation/historyNode.vue'
// import RPC from '@/views/More/RPC.vue'
// import ContractDetail from '@/views/Contracts/detail.vue'
// import Errordetail from '@/views/Detail/error_detail.vue'
// import Compile from '@/views/resources/compile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: ()=>import('@/views/Home/index.vue'),
    meta: {
      keepAlive: true,
      ID: 1
    }
  },
  {
    path: '/blockchain',
    component: () => import('@/views/Blockchain/index.vue'),
    meta: {
      ID: 2,
      keepAlive:true,
    }
  },
  {
    path: '/blockcheck',
    component: () => import('@/views/Blockchain/blockcheck.vue'),
    meta: {
      ID: 2
    }
  },
  {
    path: '/accounts',
    component: () => import('@/views/Accounts/accounts.vue'),
    meta: {
      keepAlive: false,
      ID: 4
    }
  },
  {
    path: '/validation',
    component: () => import('@/views/validation/index.vue'),
    meta: {
      keepAlive: true,
      ID: 5
    }
  },
  {
    path: '/tsx',
    component: () => import('@/views/Blockchain/tsx.vue'),
    meta: {
      ID: 2
    }
  },
  {
    path: '/contracts',
    component: () => import('@/views/Contracts/index.vue'),
    meta: {
      ID: 3
    }
  },
  {
    path: '/address_detail',
    component: () => import('@/views/Detail/address_detail/index.vue'),
    name: 'addressDetail'
  },
  {
    path: '/block_detail',
    component: () => import('@/views/Detail/block_detail/index.vue'),
    name: 'blockDetail'
  },
  {
    path: '/currency_state',
    component: () => import('@/views/More/currencyState.vue'),
    meta: {
      ID: 7
    }
  },
  {
    path: '/govern',
    component: () => import('@/views/More/govern.vue'),
    meta: {
      ID: 7
    }
  },
  {
    path: '/foundation',
    component: () => import('@/views/More/foundation.vue'),
    meta: {
      ID: 7
    }
  },
  {
    path: '/hash_detail',
    component: () => import('@/views/Detail/hash_detail/index.vue'),
    name: 'hash_detail'
  },
  {
    path: '/punishmentNode',
    component: () => import('@/views/validation/punishmentNode.vue')
  },
  {
    path: '/node_detail',
    name: 'node_detail',
    component: () => import('@/views/Detail/node_detail/index.vue')
  },
  {
    path: '/rpc',
    component:() => import('@/views/More/RPC.vue'),
    meta: {
      ID: 7
    }
  },
  {
    path: '/contract_detail',
    component: () => import('@/views/Contracts/detail.vue')
  },
  {
    path: '/error_detail',
    component: () => import('@/views/Detail/error_detail.vue')
  },
  {
    path:'/compile',
    component:() => import('@/views/resources/compile.vue'),
    meta:{
      ID:6
    }
  }
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to,from,next)=>{

// })


export default router
