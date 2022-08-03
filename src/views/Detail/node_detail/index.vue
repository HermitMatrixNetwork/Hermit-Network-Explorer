<template>
  <div class="address-detail">
    <div class="detail">
      <div class="detail-title">验证节点：GHMohhh</div>
      <div class="detailColumn">
        <BasicTitle :title="'详细信息'">
          <template #message>
            <div class="detailColumn-basic">
              <p>总余额：</p>
              <p>GHM价格:86</p>
              <p>总交易次数:</p>
            </div>
          </template>
        </BasicTitle>
      </div>

      <!--表格-->
      <div class="detail-table">
        <div class="detail-table-header">
          <span
            v-for="(item, index) in [
              '节点信息',
              '已出区块',
              '委托',
              '奖励领取明细',
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
              <h3>GHMohhh</h3>
            </div>

            <div class="column">
              <p>执行方：</p>
              <span class="specialFont">fsdaaaaaaa</span>
            </div>
            <div class="column">
              <p>合约：</p>
              <span>fsdaaaaaaa</span>
            </div>
            <div class="column">
              <p>交易额：</p>
              <span>fsdaaaaaaa GHM</span>
            </div>
            <div class="column">
              <p>手续费：</p>
              <span>fsdaaaaaaa GHM</span>
            </div>
          </div>

          <el-table
            v-if="selectNav == 2"
            style="width: 100%"
            height="612px"
            size="mini"
            :row-style="{ height: '58px' }"
            :header-cell-style="{
              background: '#F8FAFB',
              color: 'rgba(20,37,62,0.45)',
            }"
          >
            <el-table-column width="48">
              <template slot-scope="scope">
                <div class="tableEyeBackground">
                  <el-popover
                    placement="right"
                    :offset="150"
                    :visible-arrow="false"
                    width="300px"
                    trigger="click"
                  >
                    <div class="popoverBox">
                      <div class="popoverBox1">
                        <div>
                          状态 ：<span style="color: rgba(0, 0, 0, 0.25)"
                            >(X个区块确认)</span
                          >
                        </div>
                        <div class="popStatus" style="margin-top: 5px">
                          <img
                            src="@/assets/img/deal_succeed@2x.png"
                            alt=""
                            style="
                              width: 14px;
                              height: 14px;
                              vertical-align: middle;
                            "
                            v-show="true"
                          />
                          <img
                            src="@/assets/img/deal_lose@2x.png"
                            alt=""
                            style="
                              width: 14px;
                              height: 14px;
                              vertical-align: middle;
                            "
                            v-show="false"
                          />
                          成功
                          <el-divider></el-divider>
                        </div>
                        <div v-for="(item, index) in statusTitle" :key="index">
                          <div>{{ item.title }}</div>
                          <span v-show="index === 0"
                            >{{ scope.row.fee | toMoney }} GHM ($0.00)</span
                          >
                          <span v-show="index === 1"
                            >27,200Gas总量中实际消耗27,168Gas<br />@0.0004GHM</span
                          >
                          <span v-show="index === 2">957820 (位置154)</span>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <div class="detailBox">查看详情</div>
                    </div>
                    <img
                      slot="reference"
                      src="@/assets/img/table_eye_nor.png"
                    />
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="交易哈希" prop="txhash" width="180">
              <template slot-scope="scope">
                <p
                  class="specialFont"
                  @click="queryDealtoHash(scope.row.txhash)"
                >
                  {{ scope.row.txhash | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作类型" align="center">
              <template slot-scope="scope">
                <div class="dealType">
                  {{ scope.row.type == "MsgSend" ? "转账" : scope.row.type }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="区块">
              <template slot-scope="scope">
                <p class="specialFont">{{ scope.row.height | toMoney }}</p>
              </template>
            </el-table-column>
            <el-table-column label="时长" prop="timestamp"></el-table-column>
            <el-table-column label="发起地址" width="168">
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
            <el-table-column label="目标地址" width="168">
              <template slot-scope="scope">
                <p class="specialFont">
                  {{ scope.row.to_address | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="交易额" width="186" align="right">
              <template slot-scope="scope">
                <div>
                  <p v-if="scope.row.amount">
                    {{ scope.row.amount | toMoney }} GHM
                  </p>
                  <p v-else>-</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="手续费（GHM）" align="center" width="163">
              <template slot-scope="scope">
                <div>{{ scope.row.fee | toMoney }} GHM</div>
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
import mixin from "@/mixins/index.vue";
export default {
  mixins: [mixin],
  data() {
    return {
      selectNav: 0,
    };
  },
  created() {},
  methods: {},
  computed: {},
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
      > p {
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
