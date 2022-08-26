import service1 from "./request1"
import { Service } from "./request"

//获取节点区块号列表
export function getNodeblockList(limit,index,address) {
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

 //获取节点委托数列表
export function validationEntrust(address) {  
    return Service({
        url: `/cosmos/staking/v1beta1/validators/${address}/delegations`,
        method: 'GET'
    })
}

//获取节点奖励明细
export function getNodeRewardList(limit,index,address) {
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