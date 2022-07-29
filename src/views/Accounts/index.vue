<template>
  <div>
    <div class="accounts_chart">
      <div class="chart_Title">账户增长</div>
      <div class="line_chart">

      </div>
    </div>
    <div class="accounts_table">
      <div class="table_Tile">总用户数 200,664 位</div>
      <el-skeleton v-if="accountslist.length == 0" animated :rows="12" />
      <el-table :data="accountslist" style="width: 100%" size="mini" v-else>
        <el-table-column prop="id" label="排名" width="80"></el-table-column>
        <el-table-column label="地址" width="505px">
          <template slot-scope="scope">
            <a
              @click="detail(scope.row)"
              style="cursor: pointer; color: #5671f2"
            >
              {{ scope.row.address }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="denom"
          width="244px"
          label="标签"
        ></el-table-column>
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

      <div class="table_pagination">
        <el-pagination
          small
          background
          layout="prev, pager, next,sizes"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[10, 25, 50]"
          :page-size="10"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllaccounts, adresBalance, getAllanmount } from "@/api/api.js";
import * as echarts from 'echarts';
import { bar, line } from "@/echarts/index.js";
export default {
  name: "Accounts",
  data() {
    return {
      accountslist: [],
      amountnum: "",
      currentPage2: 0,
      pageData:{
        page:1,
        pageSize:10
      }
    };
  },
  created() {
    const {page,pageSize} = this.pageData
    this.getaccounts(page,pageSize);
    this.amountNumber();
    // console.log('echarts',echarts);
  },
  mounted(){
    const chart = document.querySelector('.line_chart')
    // console.log('chart',chart);
    let lineChart = echarts.init(chart)
    // console.log(lineChart);
    line(lineChart)
  },
  methods: {
    async getaccounts(page,pageSize) {
      const res = await getAllaccounts(page, pageSize);
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(val);
      const {page,pageSize} = this.pageData
      page = val
      // // this.getaccounts()
      console.log(this.pageData);
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
    font-weight: bold;
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
  // height: 732px;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;
  padding: 0 16px;
}

.table_pagination {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.line_chart{
  width: 1280px;
  height: 260px;
}

@media screen and (max-width:598px) {
  .accounts_chart{
    display: none;
  }
  .accounts_table{
    width: 100%;
  }
}
</style>
