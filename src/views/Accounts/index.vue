<template>
  <div>
    <div class="accounts_chart">
      <div class="chart_Title">
        账户增长
        <div class="navs">
          <span
            v-for="(item, index) in ['近7天', '近30天', '近60天', '近90天']"
            :key="item"
            :class="navIndex == index ? 'selectnav' : ''"
            @click="chartsChange(index)"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="line_chart"></div>
    </div>
    <div class="accounts_table">
      <div class="table_Tile">
        总用户数 <span style="color: #5671f2">{{ accountNumber }}</span> 位
      </div>
      <el-skeleton v-if="accountslist.length == 0" animated :rows="12" />
      <el-table
        :data="accountslist"
        height="612px"
        style="width: 100%"
        size="mini"
        :row-style="{ height: '58px' }"
        v-else
      >
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
          prop="@type"
          width="244px"
          label="标签"
        ></el-table-column>
        <el-table-column prop="amount" label="余额" width="270" align="right">
          <template slot-scope="scope">
            <p>{{ scope.row.amount | toMoney }} GHM</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="percent"
          label="用户数量"
          sortable
          align="right"
        ></el-table-column>
      </el-table>

      <div class="table_pagination">
        <el-pagination
          small
          layout="prev, pager, next,sizes"
          :total="accountNumber * 1"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 25, 50]"
          :page-size="10"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllaccounts,
  adresBalance,
  getAllanmount,
  getAccountsBasis,
} from "@/api/api.js";
import * as echarts from "echarts";
import { bar, line } from "@/echarts/index.js";
import { toMoney } from "@/utils/common.js";
export default {
  name: "Accounts",
  data() {
    return {
      accountslist: [],
      list: [],
      amountnum: "",
      currentPage: 0,
      navIndex: 0,
      accountNumber: "", //现有账户数量
      pageData: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    const { page, pageSize } = this.pageData;
    this.getaccounts(page, pageSize);

    this.accountNums(); //获取账户数量
    this.amountNumber();
  },
  mounted() {
    let arr = [600, 1000, 800, 900, 450, 600, 920, 450, 890, 860, 400, 650];
    const chart = document.querySelector(".line_chart");
    this.lineChart = echarts.init(chart);
    line(this.lineChart, arr);
  },
  filters: {
    toMoney,
  },
  methods: {
    async getaccounts(page, pageSize) {
      const res = await getAllaccounts(page, 50);
      let arr = res.accounts.filter(
        (item) => item["@type"].split(".").pop() !== "ModuleAccount"
      );
      //避免数据缺失
      // console.log(res);
      arr.forEach((e, index) => {
        e.amount = "";
        e.denom = "";
        e.percent = "";
        this.accountsmsg(e);
      });

      setTimeout(() => {
        this.list = arr.sort((a, b) => b.amount - a.amount);
        this.list.forEach((item, index) => {
          item.id = index + 1;
        });
        this.accountslist = this.list.slice(0, this.pageData.pageSize);
      }, 3000);
    },
    async accountsmsg(e) {
      const res = await adresBalance(e.address);
      if (res.balances.length == 0) return;
      e.amount = res.balances[0].amount;
      e.denom = res.balances[0].denom;
      e.percent = ((e.amount / this.amountnum) * 100).toFixed(8) + "%";
    },
    //获取uGHM的总的供应量
    async amountNumber() {
      const res = await getAllanmount();
      this.amountnum = res.supply[0].amount;
    },
    async accountNums() {
      const res = await getAccountsBasis(
        "ghm1pvhwpfx8n7yvvz2p43yyewece5zx76tzn6r4z7"
      );
      const {
        account: { account_number },
      } = res;
      this.accountNumber = account_number;
    },
    detail(e) {
      const { address } = e;
      this.$router.push({ path: "address_detail", query: { address } });
    },
    handleSizeChange(val) {
      this.pageData.pageSize = val;
      this.accountslist = this.list.slice(0, val);
    },
    handleCurrentChange(val) {
      let { page, pageSize } = this.pageData;
      this.accountslist = this.list.slice((val - 1) * pageSize, val * pageSize);
    },
    chartsChange(index) {
      this.navIndex = index;
      if (index == 1) {
      }
      switch (index) {
        case 0:
          line(this.lineChart, [600, 1000, 800, 900, 450, 600, 920, 450, 890, 860, 400, 650]);
          break;
        case 1:
          line(this.lineChart, [1, 2, 3, 4, 5, 6, 7]);

          break;
        case 2:
          line(this.lineChart, [7, 6, 5, 4, 3, 2, 1]);
          break;
        case 3:
          line(
            this.lineChart,
            [14, 2, 8, 16, 21, 3, 15, 17, 9, 13, 27, 5, 12, 8, 9, 11, 13]
          );
          break;
        default:
          break;
      }
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
    padding: 16px;
    display: flex;
    justify-content: space-between;
    .navs {
      font-weight: 500;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 20px;
      > span {
        padding: 4px 8px;
        border: 1px solid #e9eaef;
        cursor: pointer;
        &:hover {
          color: #5671f2;
          border: 1px solid #5671f2;
        }
      }
      .selectnav {
        color: #5671f2;
        border: 1px solid #5671f2;
      }
    }
  }
}

.accounts_table {
  .table_Tile {
    height: 60px;
    line-height: 60px;
    font-weight: 500;
    font-size: 12px;
    color: rgba(20, 37, 62, 0.85);
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

.line_chart {
  width: 1280px;
  height: 260px;
}

@media screen and (max-width: 598px) {
  .accounts_chart {
    display: none;
  }
  .accounts_table {
    margin-top: 16px;
    padding: 0;
    width: 100%;
  }
}
</style>
