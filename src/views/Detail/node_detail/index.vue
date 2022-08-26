<template>
  <div class="address-detail">
    <div class="detail">
      <div class="detail-title">
        {{ languagePack.Validators }}：{{ basic.moniker }}
      </div>
      <div class="detailColumn">
        <BasicTitle :title="languagePack.details">
          <template #message>
            <div class="detailColumn-basic">
              <p>{{ languagePack.ElectedValidators }}</p>
              <p>{{ languagePack.blockrate }}</p>
              <p>{{ languagePack.blockratein24hours }}%</p>
              <p>{{ languagePack.Livestakes }}.99%</p>
              <p>{{ languagePack.accumulatedrewardfromsystem }}.99%</p>

              <p>{{ languagePack.accumulatedrewardfromdelegation }}</p>
              <p>{{ languagePack.availabledelegationreward }}</p>
              <p>{{ languagePack.PrivateStakes }}</p>
              <p>{{ languagePack.TotalStakes }}</p>
              <p>{{ languagePack.acceptstakes }}</p>
            </div>
          </template>
        </BasicTitle>
      </div>

      <!--表格-->
      <div class="detail-table">
        <div class="detail-table-header">
          <span
            v-for="(item, index) in [
              languagePack.nodeinformation,
              languagePack.block,
              languagePack.delegation,
              languagePack.rewarddetails,
            ]"
            :class="selectNav == index ? 'selectLight' : ''"
            :key="index"
            @click="selectNav = index"
            >{{ item }}</span
          >
        </div>
        <div class="detail-table-body">
          <div class="basicMessage messageBasic" v-if="selectNav == 0">
            <div class="basicMessage-title">
              <img src="@/assets/img/bottom-bar_github.png" alt="" />
              <h3>{{ basic.moniker }}</h3>
            </div>

            <div class="column">
              <p>{{ languagePack.nodeid }}：</p>
              <span
                >1d41e93a32abf8a9afd4de2a014b72512144a395fda0462f798f898f6f5a70f30b41b106bd73</span
              >
            </div>
            <div class="column">
              <p>{{ languagePack.operationaddress }}：</p>
              <span>035C0FDD9FBB94C2892D97BB1A6B0AE264BD3018</span>
            </div>
            <div class="column">
              <p>{{ languagePack.rewardaccount }}：</p>
              <span>ghm15urq2dtp9qce4fyc85m6upwm9xul3049772z73</span>
            </div>
            <div class="column">
              <p>{{ languagePack.officialwebsite }}：</p>
              <span>{{ basic.website }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.identityauthenticationID }}：</p>
              <span class="specialFont">{{ basic.identity }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.descriptions }}：</p>
              <span>{{ basic.details }}</span>
            </div>
          </div>

          <!-- 已出区块 -->
          <el-table
            v-if="selectNav == 1"
            style="width: 100%"
            size="mini"
            :row-style="{ height: '58px' }"
            :header-cell-class-name="'tableHeaderCellStyle'"
            :row-class-name="'tableRowStyle'"
            :data="outblockTable"
          >
            <el-table-column
              :label="languagePack.blocknumber"
              prop="_id"
              width="240"
            >
              <template slot-scope="scope">
                <div class="specialFont">{{ scope.row._id }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.time" align="left">
              <template slot-scope="scope">
                <div>{{ scope.row.timestamp | timeStamp }}</div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.thenumberoftransactions"
              prop="tx_count"
              width="318"
              align="right"
            >
            </el-table-column>
            <el-table-column :label="languagePack.blockreward" align="right">
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
            <el-table-column :label="languagePack.delegate" width="240">
              <template slot-scope="scope">
                <div class="specialFont">
                  {{ scope.row.delegator_address | sliceAddress }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.delegationpercentage"
              align="right"
            >
              <template slot-scope="scope">
                <div>
                  {{ scope.row.amount | toMoney }} ({{
                    (scope.row.amount / basic.tokens).toFixed(2)
                  }}%)
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.lockeddelegation"
              align="right"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.amount | toMoney }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.undelegate" align="right">
              <template>
                <div>0</div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.statussucceededfailed"
              align="right"
            >
              <template slot-scope="scope"> 状态 </template>
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
              :label="languagePack.transactionhash"
              prop="txhash"
              width="240"
            >
              <template slot-scope="scope">
                <div class="specialFont">
                  {{ scope.row.txhash | sliceAddress }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.delegate" align="center">
              <template slot-scope="scope">
                <div class="dealType">
                  {{ scope.row.type == "MsgSend" ? "转账" : scope.row.type }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.time">
              <template slot-scope="scope">
                <p class="specialFont">{{ scope.row.height | toMoney }}</p>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.lockeddelegation"
              prop="timestamp"
            ></el-table-column>
            <el-table-column
              :label="languagePack.statussucceededfailed"
              width="168"
            >
              <template slot-scope="scope">
                <div class="specialFont">
                  {{ scope.row.from_address | sliceAddress }}
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
} from "@/api/validation.js";

export default {
  mixins: [mixin],
  data() {
    return {
      selectNav: 2,
      basic: {},
      page: {
        pageSize: 10,
        currentPage: 0,
      },
      outblockTable: [],
      delegationTable: [],
      rewardTable: [],
    };
  },
  created() {
    this.basic = this.$route.params.basic;
    console.log("路由里面的信息", this.basic);
    const { operator_address } = this.basic;
    const { pageSize, currentPage } = this.page;
    this.getData(operator_address, pageSize, currentPage);

    this.$loading();
  },
  methods: {
    async getData(address, limit, index) {
      const res = await Promise.all([
        validationNodeData(address),
        validationEntrust(address),
        getNodeblockList(limit, index, address),
        getNodeRewardList(limit, index, address),
      ]);
      if (res) {
        this.$loading().close();
      }

      console.log("节点基本信息", res[0]);
      console.log("节点委托信息列表", res[1]);
      console.log("节点出块", res[2]);

      const {
        description: { details, identity, website },
        tokens,
      } = res[0].validator;
      this.basic = { ...this.basic, details, identity, website, tokens };

      //处理数组并赋值
      this.delegaTion(res[1].delegation_responses);
      this.outblockTable = res[2].data.list;
      this.rewardTable = res[3].data.list;
    },
    //委托列表
    delegaTion(arr) {
      if (!Array.isArray(arr)) return (this.delegationTable = []);
      arr.forEach((item) => {
        const { balance, delegation } = item;
        this.delegationTable.push({ ...balance, ...delegation });
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
  margin: 24px auto;
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
      > p {
        width: 50%;
        height: 28px;
        line-height: 28px;
        margin-bottom: 16px;
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
}
</style>
