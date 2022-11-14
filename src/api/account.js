import service1 from "./request1"

//获取账户地址信息
export function queryAccountInfo(address) {
    return service1({
        url: '/api/browser/accountinfo',
        method: 'post',
        data: {
            chain_id: "ghm-testnet",
            address,
        }
    })
}

//获取账号交易列表
export function queryAccountTx(limit,index,address) {
    return service1({
        url: '/api/browser/txlist',
        method: 'post',
        data: {
            chain_id: "ghm-testnet",
            limit,
            index,
            address,
        }
    })
}

//用户增长
export function userIncrease(days){
    return service1({
        url: '/api/browser/accountincrease',
        method: 'post',
        data: {
            chain_id:'ghm-testnet',
            days
        }
    })
}







