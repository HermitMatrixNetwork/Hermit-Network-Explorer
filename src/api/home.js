import { Service } from "./request"
import service1 from './request1'

export function allAdresQuantity() {     //总地址数量
    return Service({
        url: '/cosmos/auth/v1beta1/accounts',
        method: 'GET'
    })
}

export function pledgeParameter() {      //质押参数  实时质押信息
    return Service({
        url: '/cosmos/staking/v1beta1/params',
        method: 'GET'
    })
}

export function totalCirculation() {     //总发行量
    return Service({
        url: '/cosmos/bank/v1beta1/supply',
        method: 'GET'
    })
}


//查询最新的节点信息
export function querylatestNodeMessage() {
    return Service({
        url: '/cosmos/base/tendermint/v1beta1/node_info',
        method: 'GET'
    })
}

export function getLatestBlock() {    //获取最新出块
    return Service({
        url: '/blocks/latest',
        method: 'GET'
    })
}

export function getbanner() {   
    return service1({
        url: '/upload/message/get_banner',
        method: 'get'
    })
}