<template>
    <div>
        {{ address }}
        <br />
        <br />
        <hr />
        <p>Available {{ avaliable.balances[0].amount }}</p>
        可用
        <br />
        Delegated
        <p
            v-text="
                delegated.delegation_responses.length == 0
                    ? '0'
                    : delegated.delegation_responses[0].delegation.shares
            "
        ></p>
        委托
        <br />
        Rewards
        <p v-text="reward.total.length == 0 ? 0 : reward.total[0].amount"></p>
        奖励
        <p>Unbonding {{}}</p>
        <!--解除绑定-->
        <p>Commission {{}}</p>
        <!--委员会-->
        <h3>Total {{ total }}</h3>
        <!--一共-->
    </div>
</template>

<script>
import axios from 'axios';
import { http } from '@/api/index.js';
import { adresBalance, getadresRewards, getadresDelegated } from '@/api/api.js';
export default {
    data() {
        return {
            address: '',
            reward: {
                total: [{ amount: '' }],
            },
            avaliable: {
                balances: [{ amount: '' }],
            },
            delegated: {
                delegation_responses: [],
            },
        };
    },
    created() {
        this.address = this.$route.query.address;
        this.getAccountMsg(this.$route.query.address);
    },
    methods: {
        async getAccountMsg(address) {
            // const res = await axios(http+`cosmos/auth/v1beta1/accounts/${address}`)
            const res2 = await adresBalance(address); //获取账户余额
            const res3 = await getadresRewards(address); //查询累积总奖励
            // const res4 = await axios(http+`/cosmos/distribution/v1beta1/delegators/${address}/validators`);//查询委托人的验证人
            // const res5 = await axios(http+`cosmos/distribution/v1beta1/delegators/${address}/withdraw_address`);// 撤销地址
            const res6 = await getadresDelegated(address); //根据地址查询所有委派
            // const res7 = await axios(http+`cosmos/staking/v1beta1/delegators/${address}/redelegations`);//查询给定地址的重新委派
            const res8 = await axios(
                http + `cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`
            ); //查询给定委派人地址的所有取消绑定委派。
            // const res9 = await axios(http+`/cosmos/staking/v1beta1/delegators/${address}/validators`);//通过地址查询所有验证人信息
            // console.log('res3', res3);
            // console.log('res2', res2);
            this.reward = res3;
            this.avaliable = res2;
            this.delegated = res6;
            // console.log('res4',res4);
            // console.log('res5',res5);
            // console.log('res6',res6);
            // console.log('res7',res7);
            // console.log('res8',res8);
            // console.log('res9',res9);
        },
    },
    computed: {
        total() {
            // return '$' + this.reward.amount*1+this.avaliable.amount*1+this.delegated.shares*1
        },
    },
};
</script>

<style lang="scss" scoped></style>
