<template>
  <div>
    <div class="accounts_chart">
      <div class="chart_Title">账户增长</div>
    </div>
    <div class="accounts_table">
      <div class="table_Tile">总用户数 200,664 位</div>
      <el-skeleton v-if="accountslist.length == 0" animated :rows="12" />
      <el-table :data="accountslist" style="width: 100%" size="mini" v-else>
        <el-table-column
          prop="id"
          label="排名"
          width="80"
        ></el-table-column>
        <el-table-column prop="地址" label="ADDRESS" width="505px">
          <template slot-scope="scope">
            <a @click="detail(scope.row)" style="cursor: pointer">
              {{ scope.row.address }}
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="denom" width="244px" label="标签"></el-table-column>
        <el-table-column prop="amount" label="余额">
          <template slot-scope="scope">
            <p>{{ scope.row.amount }}</p>
            <p>${{ scope.row.amount }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="percent"
          label="用户数量"
          sortable
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllaccounts, adresBalance, getAllanmount } from "@/api/api.js";
export default {
  name: "Accounts",
  data() {
    return {
      accountslist: [],
      amountnum: "",
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
        (item) => item["@type"].split(".").pop() !== "ModuleAccount"
      );
      //避免数据缺失
      list.forEach((e, index) => {
        e.id = index + 1;
        e.amount = "";
        e.denom = "";
        e.percent = "";
        this.accountsmsg(e);
      });
      setTimeout(() => (this.accountslist = list), 500);
    },
    async accountsmsg(e) {
      const res = await adresBalance(e.address);
      if (res.balances.length == 0) return;
      e.amount = res.balances[0].amount;
      e.denom = res.balances[0].denom;
      e.percent = ((e.amount / this.amountnum) * 100).toFixed(5) + "%";
    },
    //获取uGHM的总的供应量
    async amountNumber() {
      const res = await getAllanmount();
      this.amountnum = res.supply[0].amount;
    },
    detail(e) {
      const { address } = e;
      this.$router.push({ path: "address_detail", query: { address } });
    },
  },
};
</script>
<style lang="scss" scoped>
.accounts_chart {
  width: 1280px;
  height: 320px;
  margin: 24px auto;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;
  .chart_Title {
    height: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 14px;
    color: rgba(20, 37, 62, 0.85);
    letter-spacing: 0;
    padding: 16px;
  }
}

.accounts_table {
  .table_Tile {
    height: 60px;
    line-height: 60px;
  }
  width: 1248px;
  margin: 0 auto;
  height: 732px;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;
  padding: 0 16px;
}
</style>
