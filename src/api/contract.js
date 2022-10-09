import service1 from "./request1"

//获取合约列表
export function getContract(limit) {
    return service1({
        url: '/api/browser/contractlist',
        method: 'post',
        data: {
            chain_id: "dev",
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
            chain_id: "dev",
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
            chain_id:"dev",
            limit,
            index,
            address,
        }
    })
}

