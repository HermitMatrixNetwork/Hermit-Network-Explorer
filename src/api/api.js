import { Service } from "./request"

/*export function getConfigsByProductId(productId) {
    return Service({
        url: '/cosmos/auth/v1beta1/accounts',
        params: { productId: productId }
    })
}

export function addNewAndroidPlugin(data) {
    return Service({
        url: '/manager/addAndroidPlguin',
        data: JSON.stringify(data)
    })
}*/

export function getAllaccounts() {  //返回所有现有账户
    return Service({
        url: '/cosmos/auth/v1beta1/accounts',
        method: 'get'
    })
}

export function getAccountsBasis(address) {  //账号基础
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

export function getLatestBlock() {    //获取最新出块
    return Service({
        url: '/blocks/latest',
        method: 'GET'
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

export function totalCirculation() {     //总发行量
    return Service({
        url: '/cosmos/bank/v1beta1/supply',
        method: 'GET'
    })
}

export function pledgeParameter() {      //质押参数
    return Service({
        url: '/cosmos/staking/v1beta1/params',
        method: 'GET'
    })
}

export function allAdresQuantity() {     //总地址数量
    return Service({
        url: '/cosmos/auth/v1beta1/accounts',
        method: 'GET'
    })
}

export function allValidationNode() {     //获取所有验证节点
    return Service({
        url: '/cosmos/staking/v1beta1/validators',
        method: 'GET'
    })
}






