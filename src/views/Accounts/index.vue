<template>
    <div>
        Accounts
        <div class="accounts_table">
            <el-skeleton v-if="accountslist.length == 0" animated :rows="12" />
            <el-table :data="accountslist" style="width: 100%" v-else>
                <el-table-column prop="id" label="RANK" width="180" sortable></el-table-column>
                <el-table-column prop="address" label="ADDRESS" width="360">
                    <template slot-scope="scope">
                        <a @click="detail(scope.row)" style="cursor: pointer">
                            {{ scope.row.address }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="denom" width="400"></el-table-column>
                <el-table-column prop="amount" label="AMOUNT">
                    <template slot-scope="scope">
                        <p>{{ scope.row.amount }}</p>
                        <p>${{ scope.row.amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="percent" label="PERCENTAGE" sortable></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getAllaccounts, adresBalance, getAllanmount } from '@/api/api.js';
export default {
    name: 'Accounts',
    data() {
        return {
            accountslist: [],
            amountnum: '',
        };
    },
    created() {
        this.getaccounts();
        this.amountNumber();
    },
    methods: {
        async getaccounts() {
            const res = await getAllaccounts();
            const list = res.accounts.filter(
                item => item['@type'].split('.').pop() !== 'ModuleAccount'
            );
            //避免数据缺失
            list.forEach((e, index) => {
                e.id = index + 1;
                e.amount = '';
                e.denom = '';
                e.percent = '';
                this.accountsmsg(e);
            });
            setTimeout(() => (this.accountslist = list), 500);
        },
        async accountsmsg(e) {
            const res = await adresBalance(e.address);
            if (res.balances.length == 0) return;
            e.amount = res.balances[0].amount;
            e.denom = res.balances[0].denom;
            e.percent = ((e.amount / this.amountnum) * 100).toFixed(5) + '%';
        },
        //获取uGHM的总的供应量
        async amountNumber() {
            const res = await getAllanmount();
            this.amountnum = res.supply[0].amount;
        },
        detail(e) {
            const { address } = e;
            this.$router.push({ path: 'address_detail', query: { address } });
        },
    },
};
</script>
<style lang="scss" scoped>
.accounts_table {
    margin: 0 160px;
}
</style>
