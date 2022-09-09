<template>
  <div class="address-detail">
    <div class="detail">
      <div class="detail-title">
        {{ languagePack.nodetext01 }}：{{ basic.validator_name }}
      </div>
      <div class="detailColumn">
        <BasicTitle :title="languagePack.nodetext26">
          <template #message>
            <div class="detailColumn-basic messageBasic">
              <div class="column">
                <p>{{ languagePack.nodetext27 }}</p>
              </div>
              <div class="column">
                <p>{{ languagePack.nodetext28 }}:</p>
                <span>{{(1 - basic.uptime)*100}}%</span>
              </div>
              <div class="column">
                <p>{{ languagePack.nodetext29 }}:</p>
                <span>{{(1 - basic.uptime)*100}}%</span>
              </div>
              <!-- 当前委托者数 -->
              <div class="column">
                <p>{{ languagePack.nodetext30 }}:</p>
                <span>{{ basic.delegators }}</span>
              </div>
              <div class="column">
                <!-- 累计系统奖励 -->
                <p>{{ languagePack.nodetext31 }}:</p>
                <span>{{ basic.total_system_reward | toMoney }} GHM</span>
              </div>
              <!-- 累计委托奖励 -->
              <div class="column">
                <p>{{ languagePack.nodetext32 }}:</p>
                <span>{{ basic.total_delegate_reward | toMoney }} GHM</span>
              </div>
              <div class="column">
                <p>{{ languagePack.nodetext33 }} :</p>
                <span>{{ basic.outstanding_reward | toMoney }} GHM</span>
              </div>
              <div class="column">
                <p>{{ languagePack.nodetext34 }}:</p>
                <span>{{ basic.self_delegate_tokens | toMoney }} GHM</span>
              </div>
              <div class="column">
                <p>{{ languagePack.nodetext35 }}:</p>
                <span>{{ basic.tokens | toMoney }} GHM</span>
              </div>
              <div class="column">
                <p>{{ languagePack.nodetext36 }}</p>
                <span>{{ basic.delegate_tokens | toMoney }} GHM</span>
              </div>
            </div>
          </template>
        </BasicTitle>
      </div>

      <!--表格-->
      <div class="detail-table">
        <div class="detail-table-header">
          <span
            v-for="(item, index) in [
              languagePack.nodetext42,
              languagePack.nodetext37,
              languagePack.nodetext49,
              languagePack.nodetext55,
            ]"
            :class="selectNav == index ? 'selectLight' : ''"
            :key="index"
            @click="selectNav = index"
            >{{ item }}</span
          >
        </div>
        <div class="detail-table-body" :style="{minWidth:selectNav !== 0?'1000px':''}">
          <div class="basicMessage messageBasic" v-if="selectNav == 0">
            <div class="basicMessage-title">
              <img src="@/assets/img/bottom-bar_logo.png" alt="" />
              <h3>{{ basic.validator_name }}</h3>
            </div>

            <!-- 节点ID
            <div class="column">
              <p>{{ languagePack.nodeid }}：</p>
              <span
                >1d41e93a32abf8a9afd4de2a014b72512144a395fda0462f798f898f6f5a70f30b41b106bd73</span
              >
            </div> -->

            <!-- 操作地址 -->
            <div class="column">
              <p>{{ languagePack.nodetext44 }}：</p>
              <span>{{ $route.query.address }}</span>
            </div>

            <!-- 奖励账户 -->
            <div class="column">
              <p>{{ languagePack.nodetext45 }}：</p>
              <span>{{ basic.consen_addr }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.nodetext46 }}：</p>
              <span>{{ basic.website }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.nodetext47 }}：</p>
              <span class="specialFont">{{ basic.identity }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.nodetext48 }}：</p>
              <span>{{ basic.details }}</span>
            </div>
          </div>

          <!-- 已出区块 -->
          <el-table
            v-if="selectNav == 1"
            size="mini"
            :row-style="{ height: '58px' }"
            :header-cell-class-name="'tableHeaderCellStyle'"
            :row-class-name="'tableRowStyle'"
            :data="outblockTable"
          >
            <el-table-column
              :label="languagePack.nodetext37"
              prop="_id"
              width="240"
            >
              <template slot-scope="scope">
                <div
                  class="specialFont"
                  @click="queryDealtoBlock(scope.row._id)"
                >
                  {{ scope.row._id }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext38" align="left">
              <template slot-scope="scope">
                <div>{{ scope.row.timestamp | timeStamp }}</div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.nodetext39"
              prop="tx_count"
              width="318"
              align="right"
            >
            </el-table-column>
            <el-table-column :label="languagePack.nodetext40" align="right">
              <template slot-scope="scope">
                <div>{{ scope.row.coinbase }}</div>
              </template>
            </el-table-column>
          </el-table>

          <!-- 委托 -->
          <el-table
            v-if="selectNav == 2"
            style="width: 100%"
            size="mini"
            :row-style="{ height: '58px' }"
            :header-cell-class-name="'tableHeaderCellStyle'"
            :row-class-name="'tableRowStyle'"
            :data="delegationTable"
          >
            <el-table-column :label="languagePack.nodetext50" width="240">
              <template slot-scope="scope">
                <div class="specialFont" style="width: 120px">
                  <TableTooltip
                    :content="scope.row.delegator_address"
                    @click.native="
                      queryDealtoAddress(scope.row.delegator_address)
                    "
                  ></TableTooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext51" align="right">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.amount | toMoney }} ({{
                    (scope.row.amount / basic.tokens).toFixed(2)
                  }}%)
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext52" align="right">
              <template slot-scope="scope">
                <div>{{ scope.row.amount | toMoney }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext53" align="right">
              <template slot-scope="scope">
                <div>{{ scope.row.redeem | toMoney }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext54" align="right">
              <template>
                <div
                  style="
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                  "
                >
                  <div class="Txstatus" :style="{ background: '#55C499' }" />
                  success
                </div>
              </template>
            </el-table-column>
          </el-table>

          <!-- 奖励领取明细 -->
          <el-table
            v-if="selectNav == 3"
            style="width: 100%"
            size="mini"
            :row-style="{ height: '58px' }"
            :header-cell-class-name="'tableHeaderCellStyle'"
            :row-class-name="'tableRowStyle'"
            :data="rewardTable"
          >
            <el-table-column
              :label="languagePack.nodetext56"
              prop="txhash"
              width="240"
            >
              <template slot-scope="scope">
                <div class="specialFont" @click="queryTxDetail(scope.$index)">
                  {{ scope.row._id | sliceAddress }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext57">
              <template slot-scope="scope">
                <div class="specialFont" style="width: 120px">
                  <TableTooltip
                    :content="scope.row.message.delegator_address"
                    @click.native="
                      queryDealtoAddress(scope.row.message.delegator_address)
                    "
                  ></TableTooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext58">
              <template slot-scope="scope">
                <p>{{ scope.row.timestamp | timeStamp }}</p>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext59" align="right">
              <template slot-scope="scope">
                <div>{{ scope.row.tx_amount }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext54" width="168">
              <template slot-scope="scope">
                <div class="statusStyle">
                  <div
                    :style="{
                      width: '6px',
                      height: '6px',
                      borderRadius: '6px',
                      marginRight: '6px',
                      background:
                        scope.row.result == 'success' ? '#55C499' : '#ED422B',
                    }"
                  />
                  {{ scope.row.result == "success" ? "成功" : "失败" }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail-table-bottom" v-if="selectNav !== 0">
          <!-- <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 25, 50]"
            :page-size="pageSize"
            layout="prev, pager, next, sizes"
            :total="pagination"
          ></el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins";
import {
  getNodeblockList,
  validationNodeData,
  validationEntrust,
  getNodeRewardList,
  validationBasic,
  getUnbonding,
} from "@/api/validation.js";

export default {
  mixins: [mixin],
  data() {
    return {
      selectNav: 0,
      basic: {},
      page: {
        pageSize: 10,
        currentPage: 0,
      },
      outblockTable: [],
      delegationTable: [],
      rewardTable: [],
      hashList: [],
    };
  },
  created() {
    // this.basic = this.$route.params.basic;
    // console.log("路由里面的信息", this.basic);
    // const { operator_address } = this.basic;
    const { pageSize, currentPage } = this.page;
    this.address = this.$route.query.address;
    console.log(this.address);
    this.getData(this.address, pageSize, currentPage);
    this.$loading();
  },
  methods: {
    async getData(address, limit, index) {
      const res = await Promise.all([
        // validationNodeData(address),
        validationBasic(address),
        validationEntrust(address),
        getNodeblockList(limit, index, address),
        getNodeRewardList(limit, index, address),
        getUnbonding(address),
      ]);
      if (res) {
        console.log("有数据");
        this.$loading().close();
      }
      console.log("节点基本信息", res[0]);
      console.log("节点委托信息列表", res[1]);
      console.log("节点出块", res[2]);
      console.log("节点奖励", res[3]);
      console.log("节点解绑信息", res[4]);
      this.basic = res[0].data;
      //处理数组并赋值
      this.delegaTion(res[1].delegation_responses);
      this.outblockTable = res[2].data.list;
      this.rewardTable = res[3].data.list;
      if (Array.isArray(res[3].data.list)) {
        this.hashList = res[3].data.list.map((item) => {
          return { hash: item._id, type: item.type, status: item.result };
        });
      }

      let unbonds = res[4].unbonding_responses;

      unbonds.forEach((item) => {
        let bb = this.delegationTable.find(
          (v) => v.delegator_address == item.delegator_address
        );
        if (bb) {
          let num = 0;
          item.entries.forEach((ee) => {
            num += ee.balance * 1;
          });
          this.delegationTable[this.delegationTable.indexOf(bb)].redeem = num;
        }
      });
      // console.log(this.delegationTable);
    },
    //委托列表
    delegaTion(arr) {
      if (!Array.isArray(arr)) return (this.delegationTable = []);
      arr.forEach((item) => {
        const { balance, delegation } = item;
        this.delegationTable.push({ ...balance, ...delegation });
      });
    },
    queryTxDetail(index) {
      console.log(this.hashList, index);
      this.$router.replace({
        name: "hash_detail",
        params: { hash: this.hashList, index },
      });
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.detail {
  width: 1280px;
  margin: 24px auto 80px;
  &-title {
    height: 68px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    padding-left: 16px;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: rgba(20, 37, 62, 0.85);
  }
  .detailColumn {
    margin: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-item {
      width: 632px;
      //   height: 296px;
    }
    &-basic {
      height: 200px;
      display: flex;
      flex-wrap: wrap;
      .column {
        width: 50%;
        height: 36px;
        line-height: 36px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(20, 37, 62, 0.85);
      }
    }
  }

  &-table {
    width: 1280px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    overflow: auto;
    &-header,
    &-bottom {
      height: 52px;
    }
    &-body {
      height: auto;
      .basicMessage {
        height: 316px;
        padding: 12px 16px;
        &-title {
          display: flex;
          align-items: center;
          > img {
            margin-right: 16px;
            width: 40px;
            height: 40px;
          }
        }
      }
    }
    &-header {
      display: flex;
      align-items: center;
      padding: 0 16px;
      font-weight: 400;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      > span {
        line-height: 20px;
        padding: 4px 8px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-right: 0;
        cursor: pointer;
        &:nth-child(1) {
          border-radius: 2px 0 0 2px;
        }
        &:nth-child(4) {
          border-radius: 0 2px 2px 0;
          border-right: 1px solid rgba(0, 0, 0, 0.15);
        }
      }
      .selectLight {
        border: 1px solid #5671f2 !important;
        color: #5671f2;
      }
    }
  }
}

@media screen and (max-width: 598px) {
  .detail {
    width: 100%;
    .detail-title {
      padding-left: 8px;
      font-size: 12px;
      > img {
        margin: 0;
      }
    }
    .column {
      flex-direction: column;
      .column-item {
        width: 100%;
        .column-basic {
          height: auto;
          p {
            height: auto;
          }
        }
      }
    }

    .detail-table {
      width: 100%;
    }
  }

  .detailColumn {
    &-basic {
      height: auto !important;
      flex-wrap: nowrap !important;
    }
  }

  .basicMessage {
    max-width: 100vw !important;
    > div {
      white-space: inherit;
    }
  }
  
}
.statusStyle {
  display: flex;
  align-items: center;
}
</style>
