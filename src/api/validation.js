import service1 from "./request1"
import { Service } from "./request"

//获取节点区块号列表
export function getNodeblockList(limit, index, address) {
    return service1({
        url: '/api/browser/blocklist_node',
        method: 'post',
        data: {
            chain_id: "ghmdev",
            limit,
            index,
            address,
        }
    })
}

// 获取节点基本信息
export function validationNodeData(address) {
    return Service({
        url: `/cosmos/staking/v1beta1/validators/${address}`,
        method: 'GET'
    })
}

//获取节点基本信息中心化
export function validationBasic(address){
    return service1({
        url:'/api/browser/nodeinfo',
        method:'post',
        data:{
            chain_id: "ghmdev",
            address
        }
    })
}

//获取节点委托数列表
export function validationEntrust(address) {
    return Service({
        url: `/cosmos/staking/v1beta1/validators/${address}/delegations`,
        method: 'GET'
    })
}

//获取节点奖励明细
export function getNodeRewardList(limit, index, address) {
    return service1({
        url: '/api/browser/txwithdraw_node',
        method: 'post',
        data: {
            chain_id: "ghmdev",
            limit,
            index,
            address,
        }
    })
}

//获取节点列表中心化
export function getValidationList(limit, index) {
    return service1({
        url: '/api/browser/nodelist',
        method:'post',
        data: {
            chain_id: "ghmdev",
            limit,
            index
        }
    })
}

// /cosmos/staking/v1beta1/validators/ghmvaloper15v4z6h7wjcrdx0pygxyvk3naaupgk6a6e5rtrl/unbonding_delegations

//获取节点的所有解绑信息
export function getUnbonding(address='ghmvaloper15v4z6h7wjcrdx0pygxyvk3naaupgk6a6e5rtrl'){
    return Service({
        url:`/cosmos/staking/v1beta1/validators/${address}/unbonding_delegations`,
        method:'get'
    })
}

