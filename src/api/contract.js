import service1 from "./request1"
import {Service} from './request'


//获取合约列表
export function getContract(limit) {
    return service1({
        url: '/api/browser/contractlist',
        method: 'post',
        data: {
            chain_id: "Hermit",
            index: '',
            limit
        }
    })
}

//获取合约信息
export function getContractInfo(address) {
    return service1({
        url: '/api/browser/contractinfo',
        method: 'post',
        data: {
            chain_id: "Hermit",
            address
        }
    })
}

//获取合约交易记录
export function getContractTx(limit,index,address){
    return service1({
        url:'/api/browser/txcontract',
        method:'post',
        data:{
            chain_id:"Hermit",
            limit,
            index,
            address,
        }
    })
}

//获取合约创建人  http://167.179.118.118:1317/wasm/contract/ghm18vd8fpwxzck93qlwghaj6arh4p7c5n89fkfxf0
export function createPeople(address){
    return Service({
        url:`/wasm/contract/${address}`,
        method:'get'
    })
}