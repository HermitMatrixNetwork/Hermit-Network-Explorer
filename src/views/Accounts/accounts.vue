<template>
  <div>
    <div class="accounts_chart">
      <div class="chart_Title">
        {{ languagePack.accounttext01 }}
        <div class="navs">
          <span
            v-for="(item, index) in [
              languagePack.accounttext02,
              languagePack.accounttext03,
              languagePack.accounttext04,
              languagePack.accounttext05,
            ]"
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
        {{ languagePack.accounttext08 }}
        <span style="color: #5671f2">{{ pagination }}</span>
      </div>
      <el-table
        :data="accountslist"
        size="mini"
        height="612px"
        :row-style="{ height: '58px' }"
        :header-cell-class-name="'tableHeaderCellStyle'"
        :row-class-name="'tableRowStyle'"
        v-loading="loading"
      >
        <el-table-column
          :label="languagePack.accounttext09"
          width="80px"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 + pageData.page * pageData.pageSize }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          :label="languagePack.accounttext10"
          width="500"
        >
          <template slot-scope="scope">
            <div class="specialFont" @click="toDetail(scope.row.address)">
              {{ scope.row.address }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="tag" :label="languagePack.accounttext11" />
        <el-table-column
          :label="languagePack.accounttext12"
          width="270"
          align="right"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.balance / 1e6 }} GHM</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="percentage"
          :label="languagePack.accounttext13"
          width="180"
          align="right"
        >
          <template slot-scope="scope">
            <div>{{ computeAccounted(scope.row.balance) }}</div>
          </template>
        </el-table-column>
      </el-table>

      <div class="table_pagination">
        <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.page + 1"
          layout="prev, pager, next,sizes"
          :total="pagination"
          :page-sizes="[10, 25, 50]"
          :page-size="10"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllanmount, queryAccountList } from "@/api/api.js";
import {userIncrease} from '@/api/account.js'
import * as echarts from "echarts";
import { bar, line } from "@/echarts/index.js";
import { toMoney } from "@/utils/common.js";
export default {
  name: "Accounts",
  data() {
    return {
      accountslist: [],
      amountnum: "",
      currentPage: 0,
      navIndex: 0,
      accountNumber: "", //现有账户数量
      loading: true,
      pagination: 0,
      pageData: {
        page: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    const { page, pageSize } = this.pageData;
    this.getaccounts(pageSize, page);
    this.amountNumber();
  },
  mounted() {
    // console.log(date);
    const chart = document.querySelector(".line_chart");
    this.lineChart = echarts.init(chart);
    this.queryUsergrow(7)
    // .then(res=>{
    //     console.log(res);
    //     let userList = res.map((e,index)=>{
    //       return {user:e,date:date-index*1000*60*60*24}
    //     })
    //     // console.log(userList);
    //     line(this.lineChart, userList.reverse(), this.languagePack.prompttext12);
    // });
    // console.log(arr);
    
    
    

    
  },
  filters: {
    toMoney,
  },
  methods: {
    async getaccounts(pageSize, page) {
      const res = await queryAccountList(pageSize, page);
      // console.log("获取的数组", res.data.list);
      this.accountslist = res.data.list;
      if (this.pagination == 0) return (this.pagination = res.data.total);
    },
    //获取uGHM的总的供应量
    async amountNumber() {
      const res = await getAllanmount();
      this.amountnum = res.supply[0].amount;
    },
    toDetail(address) {
      this.$router.push({ path: "address_detail", query: { address } });
    },
    handleSizeChange(value) {
      this.accountslist = [];
      this.getaccounts((this.pageData.pageSize = value), this.pageData.page);
    },
    handleCurrentChange(val) {
      this.pageData.page = val - 1;
      let { pageSize, page } = this.pageData;
      this.accountslist = [];
      this.getaccounts(pageSize, page);
    },
    chartsChange(index) {
      this.navIndex = index;
      switch (index) {
        case 0:
        this.queryUsergrow(7)
          break;
        case 1:
        this.queryUsergrow(30)
          break;
        case 2:
        this.queryUsergrow(60)
          break;
        case 3:
        this.queryUsergrow(90)
          break;
        default:
          break;
      }
    },
    //获取用户增长信息
    async queryUsergrow(days){
      const {data} = await userIncrease(days)
      let date = Date.parse(new Date())
      let userList = data.map((e,index)=>{
          return {user:e,date:date-index*1000*60*60*24}
        })
        // console.log(userList);
        line(this.lineChart,this.userList = userList.reverse(), this.languagePack.prompttext12);
      // console.log(res);
      // return res.data
    }
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    computeAccounted() {
      return function (num) {
        return ((num / this.amountnum) * 100).toFixed(8) + "%";
      };
    },
  },
  watch: {
    accountslist(value) {
      if (Array.isArray(value)) {
        this.loading = this.accountslist.length === 0 ? true : false;
      } else {
        this.loading = false;
      }
    },
    languagePack(val) {
      line(this.lineChart, this.userList, val.prompttext12);
    },
    deep: true,
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
    height: 52px;
    font-weight: bold;
    font-size: 14px;
    color: rgba(20, 37, 62, 0.85);
    padding: 16px;
    display: flex;
    justify-content: space-between;
    .navs {
      font-weight: bold;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 20px;
      > span {
        padding: 4px 8px;
        border: 1px solid #e9eaef;
        cursor: default;
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
    padding-left: 16px;
  }
  width: 1280px;
  margin: 0 auto 80px;
  // height: 732px;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;
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
