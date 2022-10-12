<template ref="test">
  <div class="validation">
    <div class="validationMain">
      <h3 class="title">{{ languagePack.nodetext01 }}</h3>

      <div class="validation-column">
        <div class="column-item">
          <BasicTitle :title="languagePack.nodetext02">
            <template #message>
              <div class="messageBasic" style="height: 124px">
                <div class="column">
                  <p>{{ languagePack.nodetext03 }}：</p>
                  <span>{{ all.length }}</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.nodetext04 }}：</p>
                  <span>{{ activeNode.length }}</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.nodetext05 }}：</p>
                  <span>{{ candidate.length }}</span>
                </div>
              </div>
            </template>
          </BasicTitle>
        </div>
        <div class="column-item">
          <BasicTitle :title="languagePack.nodetext06">
            <template #message>
              <div
                class="messageBasic"
                style="height: 124px; justify-content: flex-start"
              >
                <div class="column">
                  <p>{{ languagePack.nodetext07 }}：</p>
                  <span>{{ totalEntrust }} GHM</span>
                </div>
                <div class="column" style="margin: 16px 0">
                  <p>{{ languagePack.nodetext09 }}：</p>
                  <span>
                    {{ (totalEntrust*100 / pledgeMessage.issueNum) }} %</span
                  >
                </div>
              </div>
            </template>
          </BasicTitle>
        </div>
      </div>

      <div class="validation-table">
        <div class="validation-table-header">
          <div class="left">
            <div class="navs">
              <span
                v-for="(item, index) in [
                  languagePack.nodetext10,
                  languagePack.nodetext11,
                  languagePack.nodetext12,
                ]"
                :key="index"
                :class="screenIndex == index ? 'navSelected' : ''"
                @click="screenIndex = index"
                >{{ item }}</span
              >
            </div>

            <!-- 表头搜索框 -->
            <el-input
              :placeholder="languagePack.nodetext13"
              v-model="searchValue"
              class="tableHeaderInput"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchNode"
              ></el-button>
            </el-input>
          </div>

          <div class="right">
            <span @click="toGo('/punishmentNode')">{{
              languagePack.nodetext14
            }}</span>
          </div>
        </div>

        <div class="validation-table-body">
          <el-table
            :data="tableList"
            size="mini"
            height="612px"
            :row-style="{ height: '58px !important' }"
            :header-cell-class-name="'tableHeaderCellStyle'"
            :row-class-name="'tableRowStyle'"
            v-loading="loading"
          >
            <el-table-column
              :label="languagePack.nodetext16"
              width="80"
              align="center"
            >
            <template slot-scope="scope">
              {{(scope.$index+1) + Number(page.pageSize*page.currentPage)}}
            </template>
          </el-table-column>
            <el-table-column :label="languagePack.nodetext17" width="160">
              <template slot-scope="scope">
                <div class="moniker">
                  <img src="@/assets/img/bottom-bar_logo@2x.png" alt="" />
                  {{ scope.row.validator_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext60" width="180">
              <template slot-scope="scope">
                <p class="specialFont" @click="TableClick(scope.row)">
                  {{ scope.row.operator_address | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext18" width="180">
              <template slot-scope="scope">
                <p class="specialFont" @click="queryDealtoAddress(scope.row.self_delegator)">
                  {{ scope.row.self_delegator | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext19">
              <template slot-scope="scope">
                <div class="stateColumn">
                  <div
                    :style="{
                      width: '6px',
                      height: '6px',
                      borderRadius: '6px',
                      marginRight: '6px',
                      background:
                        scope.$index >100 ? '#ED422B' : '#55C499',
                    }"
                  />
                  {{
                    scope.$index >100
                      ? languagePack.nodetext12
                      : languagePack.nodetext11
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.nodetext21"
              width="168"
              align="right"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.tokens / 1e6 }} GHM</div>
              </template>
            </el-table-column>

            <!-- 委托奖励比例 -->
            <!-- <el-table-column :label="languagePack.nodetext22" align="right">
              <template slot-scope="scope">
                <p>{{ (scope.row.total_delegate_reward/scope.row.total_system_reward*100).toFixed(2) }} %</p>
              </template>
            </el-table-column> -->
            <el-table-column :label="languagePack.nodetext23" align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.delegators }}</p>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.nodetext24"
              width="120"
              align="right"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.uptime?(scope.row.uptime * 100).toFixed(2):0 }}%</div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext25" align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.commission_rate * 100 }} %</p>
              </template>
            </el-table-column>
            <div slot="empty">{{ languagePack.prompttext11 }}</div>
          </el-table>
        </div>
        <div class="validation-table-bottom">
          <el-pagination
            small
            layout="prev, pager, next,sizes"
            :total="nodeList.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 25, 50]"
            :page-size="10"
            :current-page="page.currentPage+1"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pledgeTotal, totalCirculation } from "@/api/home.js";
import { getValidationList } from "@/api/validation.js";
import {allValidationNode} from '@/api/api'
import mixin from "@/mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      loading: true,
      searchValue: "",
      screenIndex: 0,
      pagination: 0,
      tableList: [],
      all:[],
      pledgeMessage: {
        issueNum: 0,
        pledgeNum: 0,
        Pledgerate: 0,
      },
      nodeList: [],
      activeNode: [], //活跃节点数
      candidate: [], //候选节点数
      page: {
        currentPage: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    // this.queryAllValidation();
    this.queryPledge();

    const { currentPage, pageSize } = this.page;
    this.getList(pageSize, currentPage);
  },
  mounted() {},
  methods: {
    async getList(limit, index) {
      const res = await getValidationList(0, 0);
      console.log("中心化节点列表",res);
      let arr = res.data.list.sort((a,b)=>b.tokens - a.tokens);
      this.all = this.nodeList = arr.filter(e=>!e.jailed);
      // arr.forEach((e) => (e.status = e.status.split("_").pop()));
      // this.tableList = arr.slice(0,10)
      this.filterNodelist(arr)
      this.activeNode = this.all.length>100?this.all.slice(0,100):this.all
      this.candidate = this.all.length>100?this.all.slice(100,this.all.length-1):[]
      this.pagination = res.data.total
    },
    handleSizeChange(val) {
      this.tableList = [];
      // this.getList((this.page.pageSize = val), (this.page.currentPage = 0));
      this.filterNodelist(this.nodeList,this.page.currentPage = 0,this.page.pageSize = val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.screenIndex = 0
      this.tableList = [];
      // this.getList(this.page.pageSize, this.page.currentPage = val - 1);
      this.filterNodelist(this.nodeList,(this.page.currentPage = val-1)*this.page.pageSize,this.page.pageSize*val)
    },

    TableClick(val) {
      this.$router.push({
        name: "node_detail",
        query: { address: val.operator_address },
      });
    },
    async queryPledge() {
      // const pledge = await pledgeTotal(); //获取质押参数
      // console.log(pledge);
      const issueNum = await totalCirculation(); //获取总发行量
      this.pledgeMessage.issueNum = issueNum.supply[0].amount / 1e6;
      // this.pledgeMessage.pledgeNum = pledge.params.historical_entries; //质押参数
      // this.pledgeMessage.Pledgerate = (
      //   this.pledgeMessage.pledgeNum / this.pledgeMessage.issueNum
      // ).toFixed(2); //质押率

      // console.log("获取质押参数", pledge, "获取总发行量", issueNum);
    },
    searchNode() {
      if (this.screenIndex === 0) {
        this.tableList = this.nodeList.filter((item) => {
          return item.validator_name.includes(this.searchValue);
        }).slice(0,this.page.pageSize);
      }
      if (this.screenIndex === 1) {
        this.tableList = this.activeNode.filter((item) => {
          return item.validator_name.includes(this.searchValue);
        }).slice(0,this.page.pageSize);
      }
      if (this.screenIndex === 2) {
        this.tableList = this.candidate.filter((item) => {
          return item.validator_name.includes(this.searchValue);
        }).slice(0,this.page.pageSize);
      }
    },
    filterNodelist(arr,page=0,pageSize=10){
      this.tableList = arr.slice(page,pageSize)
    }
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    totalEntrust() {
      let num = 0;
      this.all.forEach((item) => {
        num += item.tokens*1;
      });
      return num / 1e6;
    },
  },
  watch: {
    tableList(val) {
      if (Array.isArray(val)) {
        this.loading = val.length === 0 ? true : false;
      } else {
        this.loading = false;
      }
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    screenIndex(val){
      switch (val) {
        case 0:
          this.filterNodelist(this.nodeList = this.all)
          // this.tableList = this.nodeList;
          break;
        case 1:
          // this.tableList = ;
          this.filterNodelist(this.nodeList = this.activeNode)
          break;
        case 2:
          // this.tableList = this.candidate;
          this.filterNodelist(this.nodeList = this.candidate)
          break;
        default:
          break;
      }
      this.page.currentPage = 0
      // this.pagination = this.tableList.length
    }
  },
};
</script>

<style lang="scss" scoped>
.validationMain {
  width: 1280px;
  margin: 0 auto 80px;
  .title {
    padding: 16px 0;
  }

  .validation-column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .column-item {
      width: 632px;
      height: 208px;
    }
  }

  .validation-table {
    box-sizing: border-box;
    margin-top: 16px;
    // height: 732px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    &-header {
      height: 60px;
      display: flex;
      padding: 0 16px;
      align-items: center;
      justify-content: space-between;
      .left {
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .navs {
          width: 150px;
          > span {
            padding: 4px 8px;
            height: 20px;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.65);
            border: 1px solid #e9eaef;
            cursor: pointer;
          }
        }
      }

      .right {
        > span {
          padding: 0 10px;
          font-weight: 400;
          font-size: 12px;
          color: #1e42ed;
          line-height: 18px;
          cursor: pointer;
        }
      }
    }

    &-body {
      // height: 600px;
      .stateColumn {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }
      .moniker {
        display: flex;
        align-items: center;
        white-space: nowrap;
        > img {
          width: 24px;
          padding: 0 8px;
        }
      }
    }
    &-bottom {
      height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.navSelected {
  border: 1px solid #5671f2 !important;
  color: #5671f2 !important;
}

::v-deep .el-input {
  width: 240px;
  .el-input__inner {
    height: 28px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
  }
}
::v-deep .el-input-group__append {
  padding: 0 6px;
}
::v-deep .tableHeaderInput {
  > input {
    &::placeholder {
      color: rgba(20, 37, 62, 0.25);
    }
    transition: border-color 0.3s cubic-bezier(0, 0.82, 0.165, 1);
    &:hover {
      border-color: #5671f2;
    }
    &:focus {
      border-color: #5671f2;
    }
  }
}

@media screen and (max-width: 598px) {
  .validationMain {
    width: 100%;
    .title {
      padding-left: 10px;
    }
    .validation-column {
      flex-direction: column;
      width: 100%;

      .column-item {
        width: 100%;
        margin: 8px 0;
      }
    }

    .validation-table {
      width: 100%;
      &-header {
        height: 100px;
        flex-direction: column;
        align-items: flex-start;
        padding: 0;
        .left {
          margin-top: 10px;
          flex-direction: column;
          height: 60px;
          width: 100%;
          align-items: flex-start;
          > div {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.validationTableHeader {
  background: #f8fafb !important;
  .cell {
    white-space: nowrap !important;
    font-size: 12px;
    color: #86909c;
  }
}
</style>
