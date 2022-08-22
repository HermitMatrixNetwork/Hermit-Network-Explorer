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
              languagePack.blocknumber,
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
            height="612px"
            size="mini"
            :row-style="{ height: '58px' }"
            :header-cell-style="{
              background: '#F8FAFB',
              color: 'rgba(20,37,62,0.45)',
              height: '32px',
              padding: '0',
              paddingLeft: '6px',
            }"
          >
            <el-table-column
              :label="languagePack.blocknumber"
              prop="txhash"
              width="180"
            >
            </el-table-column>
            <el-table-column
              :label="languagePack.time"
              align="center"
            >
            </el-table-column>
            <el-table-column :label="languagePack.thenumberoftransactions">
              
            </el-table-column>
            <el-table-column
              :label="languagePack.blockreward"
              prop="timestamp"
              align="right"
            ></el-table-column>
          </el-table>

          <!-- 委托 -->
          <el-table
            v-if="selectNav == 2"
            style="width: 100%"
            height="612px"
            size="mini"
            :row-style="{ height: '58px' }"
            :header-cell-style="{
              background: '#F8FAFB',
              color: 'rgba(20,37,62,0.45)',
              height: '32px',
              padding: '0',
              paddingLeft: '6px',
            }"
          >
            <el-table-column
              :label="languagePack.delegate"
              prop="txhash"
              width="180"
            >
              <template slot-scope="scope">
                <p
                  class="specialFont"
                  @click="queryDealtoHash(scope.row.txhash)"
                >
                  {{ scope.row.txhash | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.delegationpercentage"
              align="center"
            >
              <template slot-scope="scope">
                <div class="dealType">
                  {{ scope.row.type == "MsgSend" ? "转账" : scope.row.type }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.lockeddelegation">
              <template slot-scope="scope">
                <p class="specialFont">{{ scope.row.height | toMoney }}</p>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.undelegate"
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
            <el-table-column width="57">
              <template>
                <div>
                  <img src="@/assets/img/table_transmit.png" alt="" />
                </div>
              </template>
            </el-table-column>
          </el-table>

          <!-- 奖励领取明细 -->
          <el-table
            v-if="selectNav == 3"
            style="width: 100%"
            height="612px"
            size="mini"
            :row-style="{ height: '58px' }"
            :header-cell-style="{
              background: '#F8FAFB',
              color: 'rgba(20,37,62,0.45)',
              height: '32px',
              padding: '0',
              paddingLeft: '6px',
            }"
          >
            <el-table-column
              :label="languagePack.transactionhash"
              prop="txhash"
              width="180"
            >
              <template slot-scope="scope">
                <p
                  class="specialFont"
                  @click="queryDealtoHash(scope.row.txhash)"
                >
                  {{ scope.row.txhash | sliceAddress }}
                </p>
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
              :label="languagePack.totaldelegatedreward"
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
            <el-table-column width="57">
              <template>
                <div>
                  <img src="@/assets/img/table_transmit.png" alt="" />
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
import { validationNodeData, validationEntrust } from "@/api/api.js";
export default {
  mixins: [mixin],
  data() {
    return {
      selectNav: 0,
      basic: {},
    };
  },
  created() {
    this.basic = this.$route.params.basic;
    console.log(this.basic);
    const { jailed, operator_address } = this.basic;
    this.getData(operator_address);
  },
  methods: {
    async getData(address) {
      const res = await validationNodeData(address);
      const res2 = await validationEntrust(address);
      console.log("节点基本信息", res);
      const { details, identity, website } = res.validator.description;
      this.basic = { ...this.basic, details, identity, website };
      console.log("节点委托信息", res2);
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
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: rgba(20, 37, 62, 0.85);
    > img {
      margin-left: 10px;
      cursor: pointer;
    }
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
