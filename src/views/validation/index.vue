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
                  <span>{{ tableList.length }}</span>
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
              <div class="messageBasic" style="height: 124px">
                <div class="column">
                  <p>{{ languagePack.nodetext07 }}：</p>
                  <span>{{ pledgeMessage.pledgeNum | toMoney }} GHM</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.nodetext08 }}：</p>
                  <span>{{ pledgeMessage.issueNum | toMoney }} GHM</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.nodetext09 }}：</p>
                  <span> {{ pledgeMessage.Pledgerate }} %</span>
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
                @click="navBtn(index)"
                >{{ item }}</span
              >
            </div>

            <!-- 表头搜索框 -->
            <el-input
              :placeholder="languagePack.nodetext13"
              v-model="searchValue"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>

          <div class="right">
            <span @click="toGo('/punishmentNode')">{{
              languagePack.nodetext14
            }}</span>
            <!-- <span @click="toGo('/historyNode')">{{
              languagePack.VerifiedValidators
            }}</span> -->
          </div>
        </div>

        <div class="validation-table-body">
          <el-table
            :data="tableList"
            size="mini"
            height="612px"
            :row-style="{ height: '58px' }"
            :header-cell-class-name="'validationTableHeader'"
            :row-class-name="'tableRowStyle'"
            @row-click="TableClick"
            v-loading="loading"
          >
            <el-table-column
              :label="languagePack.nodetext16"
              width="80"
              align="center"
              type="index"
            ></el-table-column>
            <el-table-column :label="languagePack.nodetext17" width="160">
              <template slot-scope="scope">
                <div class="moniker">
                  <img src="@/assets/img/bottom-bar_github.png" alt="" />
                  {{ scope.row.validator_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext18" width="180">
              <template slot-scope="scope">
                <p class="specialFont">
                  {{ scope.row.operator_address | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.nodetext19"
              width="88"
            >
              <template slot-scope="scope">
                <div class="stateColumn">
                  <div
                    :style="{
                      width: '6px',
                      height: '6px',
                      borderRadius: '6px',
                      marginRight: '6px',
                      background:
                        scope.row.status == 'UNBONDING' ? '#ED422B' : '#55C499',
                    }"
                  />
                  {{
                    scope.row.status == "BONDED"
                      ? "活跃中"
                      : scope.row.status == "UNBONDING"
                      ? "候选中"
                      : "共识中"
                  }}
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              :label="'总质押'"
              width="180"
              align="right"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.tokens | toMoney }} GHM</p>
              </template>
            </el-table-column> -->
            <el-table-column
              :label="languagePack.nodetext21"
              width="168"
              align="right"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.delegate_tokens | toMoney }} GHM</div>
              </template>
            </el-table-column>

            <el-table-column
              :label="languagePack.nodetext22"
              align="right"
            >
              <template slot-scope="scope">
                <p>
                  {{
                    (scope.row.tokens - scope.row.min_self_delegation * 1e5)
                      | toMoney
                  }}
                  GHM
                </p>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.nodetext23"
              align="right"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.delegators }}</p>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.nodetext24"
              width="120"
              align="right"
              prop="count"
            ></el-table-column>
            <!-- <el-table-column
              label="活跃度"
              width="80"
              prop="active"
            ></el-table-column> -->
            <el-table-column :label="languagePack.nodetext25" align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.commission_rate * 100 }} %</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="validation-table-bottom">
          <el-pagination
            small
            layout="prev, pager, next,sizes"
            :total="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 25, 50]"
            :page-size="10"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allValidationNode, validationEntrust } from "@/api/api.js";
import { pledgeParameter, totalCirculation } from "@/api/home.js";
import { getValidationList } from "@/api/validation.js";
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
      pledgeMessage: {
        issueNum: 0,
        pledgeNum: 0,
        Pledgerate: 0,
      },
      nodeList: [],
      newNodeList: [],
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
    // async queryAllValidation() {
    //   const res = await allValidationNode();
    //   console.log("获取所有验证节点信息", res);
    //   let arr = [];
    //   res.validators.forEach(async (item) => {
    //     let {
    //       description: { moniker },
    //       status,
    //       tokens,
    //       jailed,
    //       min_self_delegation,
    //       operator_address,
    //       commission,
    //     } = item;

    //     // let a = await validationEntrust(operator_address);
    //     // let delegateCount = a.delegation_responses.length;
    //     arr.push({
    //       moniker,
    //       status: status.split("_").pop(),
    //       tokens,
    //       jailed,
    //       operator_address,
    //       commission: commission.commission_rates.rate,
    //       min_self_delegation,
    //     });
    //   });
    //   this.nodeList = arr.sort((a, b) => b.tokens - a.tokens);
    //   this.delegateCount();

    //   this.activeNode = arr.filter((item) => item.status === "BONDED");
    //   this.candidate = arr.filter((item) => item.status == "UNBONDING");

    //   // console.log(this.nodeList);
    //   setTimeout(() => {
    //     this.newNodeList = JSON.parse(JSON.stringify(this.nodeList));
    //     this.loading = false;
    //   }, 3000);
    // },
    async getList(limit, index) {
      const res = await getValidationList(limit, index);
      console.log("中心化节点列表", res);
      let arr = res.data.list;
      this.tableList = arr;
      arr.forEach((e) => (e.status = e.status.split("_").pop()));
      this.activeNode = arr.filter((item) => item.status === "BONDED");
      this.candidate = arr.filter((item) => item.status === "UNBONDING");
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    navBtn(index) {
      this.screenIndex = index;
      if (index == 0)
        return (this.newNodeList = JSON.parse(JSON.stringify(this.nodeList)));
      this.newNodeList = this.nodeList.filter((item) => {
        return index == 1
          ? item.status == "BONDED"
          : item.status == "UNBONDING";
      });
    },

    TableClick(val) {
      this.$router.push({
        name: "node_detail",
        query: { address: val.operator_address },
      });
      // console.log(val);
    },
    async queryPledge() {
      const pledge = await pledgeParameter(); //获取质押参数
      const issueNum = await totalCirculation(); //获取总发行量
      this.pledgeMessage.issueNum = issueNum.supply[0].amount;
      this.pledgeMessage.pledgeNum = pledge.params.historical_entries; //质押参数
      this.pledgeMessage.Pledgerate = (
        this.pledgeMessage.pledgeNum / this.pledgeMessage.issueNum
      ).toFixed(2); //质押率

      console.log(pledge, issueNum);
    },
    delegateCount() {
      this.nodeList.forEach(async (item) => {
        const res = await validationEntrust(item.operator_address);
        item.count = res.delegation_responses.length;
        // console.log('委托数',res);
      });
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
  },
  watch: {
    tableList(val) {
      if (Array.isArray(val)) {
        this.loading = val.length === 0 ? true : false;
      }else{
        this.loading = false
      }
    },
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
      }
      .moniker {
        display: flex;
        align-items: center;
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
    color: rgba(20, 37, 62, 0.25);
    line-height: 20px;
  }
}
::v-deep .el-input-group__append {
  padding: 0 6px;
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
    color: rgba(20, 37, 62, 0.45);
  }
}
</style>
