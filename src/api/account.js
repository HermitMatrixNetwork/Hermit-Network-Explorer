import service1 from "./request1"

//获取账户地址信息
export function queryAccountInfo(address) {
    return service1({
        url: '/api/browser/accountinfo',
        method: 'post',
        data: {
            chain_id: "ghmdev",
            address,
        }
    })
}

//获取账号交易列表
export function queryAccountTx(limit,index,address) {
    return service1({
        url: '/api/browser/txaccount',
        method: 'post',
        data: {
            chain_id: "ghmdev",
            limit,
            index,
            address,
        }
    })
}








