import { Service } from "./request"
import service1 from "./request1"


export function getAllaccounts(page, pageSize) {  //返回所有现有账户
    return Service({
        url: `/cosmos/auth/v1beta1/accounts?pagination.offset=${page}&pagination.limit=${pageSize}`,
        method: 'get'
    })
}

export function getAccountsBasis(address) {  //获取当前全部账户数量
    return Service({
        url: `/cosmos/auth/v1beta1/accounts/${address}`,
        method: 'get'
    })
}

export function adresBalance(address) {  //通过地址查询该账户的余额
    return Service({
        url: `/cosmos/bank/v1beta1/balances/${address}`,
        method: 'get'
    })
}

export function getAllanmount() {  //获取uGHM的总的供应量
    return Service({
        url: '/cosmos/bank/v1beta1/supply',
        methodL: 'get'
    })
}

export function getadresRewards(address) {  //通过地址查询账户总奖励
    return Service({
        url: `/cosmos/distribution/v1beta1/delegators/${address}/rewards`,
        method: 'get'
    })
}

export function nodePledgeMsg(address) {    //对节点质押信息
    return Service({
        url: `/cosmos/distribution/v1beta1/delegators/${address}/validators`,
        method: 'get'
    })
}

export function receiveReward(address) {    //领取奖励地址
    return Service({
        url: `/cosmos/distribution/v1beta1/delegators/${address}/withdraw_address`,
        method: 'get'
    })
}

export function getadresDelegated(address) {  //通过地址查询账户所有委派  查地址质押信息
    return Service({
        url: `cosmos/staking/v1beta1/delegations/${address}`,
        method: 'get'
    })
}

export function getadresUnbonding(address) {  //通过地址查询所有取消绑定委派
    return Service({
        url: `cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`,
        method: 'get'
    })
}

export function againPledgemsg(address) {    //重新质押的信息
    return Service({
        url: `/cosmos/staking/v1beta1/delegators/${address}/redelegations`,
        method: 'get'
    })
}

export function getHashContent(hash) {    //通过hash获取
    return Service({
        url: `/cosmos/tx/v1beta1/txs/${hash}`,
        method: 'get'
    })
}

export function getBlockContent(value) {  //通过高度获取块信息
    return Service({
        url: `/cosmos/base/tendermint/v1beta1/blocks/${value}`,
        method: 'GET'
    })
}

export function getTokenContent(data) {    //合约地址
    return Service({
        url: `/wasm/contract/${data}`,
        method: 'GET'
    })
}


export function allValidationNode(page=0,pageSize=0) {     //获取所有验证节点
    return Service({
        url: `/cosmos/staking/v1beta1/validators?pagination.offset=${page}&pagination.limit=${pageSize}&pagination.count_total=true&pagination.reverse=false`,
        method: 'GET'
    })
}

//查询地址的交易信息
export function getAddressTxs(data) {
    return Service({
        url: '/cosmos/tx/v1beta1/txs',
        method: 'GET',
        params: {
            events: data
        }
    })
}

//查询历史验证节点
export function queryHistoryNode() {
    return Service({
        url: '/cosmos/base/tendermint/v1beta1/node_info',
        method: 'GET'
    })
}


//查询顶级账户的数据信息
export function queryAccountList(limit, index) {
    return service1({
        url: '/api/browser/accountlist',
        method: 'POST',
        data: {
            chain_id: 'Hermit',
            limit,
            index
        }
    })
}

//提交上币申请
export function sumbitToken(data){
    return service1({
        url:'/upload/apply/apply',
        method:'POST',
        data
    })
}

//测试币领取
export function testToken(data,faucet=true){
    return service1({
        url:`/faucet/faucet?address=${data}`,
        method:'get',
        faucet
    })
}