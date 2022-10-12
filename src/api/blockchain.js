import service1 from "./request1";




//通过 区块高度 查询区块的详细信息
export function queryBlockdetails(data) {
    return service1({
        url: '/api/browser/blockdetails',
        method: 'POST',
        data: {
            chain_id: "dev",
            height: data
        }
    })
}

//通过 区块hash 查询区块的详细信息
export function queryBlockdetails_hash(hash) {
    return service1({
        url: '/api/browser/blockdetails',
        method: 'POST',
        data: {
            chain_id: "dev",
            hash
        }
    })
}

//查询交易列表
export function queryTxList(limit, index) {
    return service1({
        url: '/api/browser/txlist',
        method: 'POST',
        data: {
            chain_id: "dev",
            limit,
            index
        }
    })
}

//查询区块的数据列表
export function queryBlockList(limit,index) {
    return service1({
        url: '/api/browser/blocklist',
        method: 'POST',
        data: {
            chain_id: "dev",
            limit,
            index
        }
    })
}

//hash查询交易详情
export function getHashContent(hash) {
    return service1({
        url: '/api/browser/txhash',
        method: 'POST',
        data: {
            chain_id: "dev",
            hash,
        }
    })
}