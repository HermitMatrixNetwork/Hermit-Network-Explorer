import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/index.vue'
import Blockchain from '@/views/Blockchain/index.vue'
import Accounts from '@/views/Accounts/accounts.vue'
import Faucet from '@/views/More/faucet.vue'
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
import RPC from '@/views/More/RPC.vue'
import ContractDetail from '@/views/Contracts/detail.vue'
import Errordetail from '@/views/Detail/error_detail.vue'
import Compile from '@/views/resources/compile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true,
      ID: 1
    }
  },
  {
    path: '/blockchain',
    component: Blockchain,
    meta: {
      ID: 2,
      keepAlive:true,
    }
  },
  {
    path: '/blockcheck',
    component: BlockCheck,
    meta: {
      ID: 2
    }
  },
  {
    path: '/accounts',
    component: Accounts,
    meta: {
      keepAlive: false,
      ID: 4
    }
  },
  {
    path: '/validation',
    component: Validation,
    meta: {
      keepAlive: true,
      ID: 5
    }
  },
  {
    path: '/faucet',
    component: Faucet,
    meta: {
      ID: 7
    }
  },
  {
    path: '/tsx',
    component: Tsx,
    meta: {
      ID: 2
    }
  },
  {
    path: '/contracts',
    component: Contracts,
    meta: {
      ID: 3
    }
  },
  // {
  //   path: '/developapi',
  //   component: Resources,
  //   meta: {
  //     ID: 6
  //   }
  // },
  {
    path: '/address_detail',
    component: Addressdetail,
    name: 'addressDetail'
  },
  {
    path: '/block_detail',
    component: Blockdetail,
    name: 'blockDetail'
  },
  {
    path: '/currency_state',
    component: currencyState,
    meta: {
      ID: 7
    }
  },
  {
    path: '/govern',
    component: Govern,
    meta: {
      ID: 7
    }
  },
  {
    path: '/foundation',
    component: Foundation,
    meta: {
      ID: 7
    }
  },
  {
    path: '/hash_detail',
    component: Hashdetail,
    name: 'hash_detail'
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
    path: '/node_detail',
    name: 'node_detail',
    component: Nodedetail
  },
  {
    path: '/rpc',
    component: RPC,
    meta: {
      ID: 7
    }
  },
  {
    path: '/contract_detail',
    component: ContractDetail
  },
  {
    path: '/error_detail',
    component: Errordetail
  },
  {
    path:'/compile',
    component:Compile,
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
