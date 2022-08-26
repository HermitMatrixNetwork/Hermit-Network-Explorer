<template>
  <div class="address-detail">
    <div class="detail">
      <div class="detail-title">
        {{ languagePack.address }}：{{ address
        }}<img src="@/assets/img/copy.png" @click="Copy(address)" />
        <el-popover placement="top" trigger="hover" popper-class="qrcodeStyle">
          <vueQr
            :text="address"
            :size="80"
            :margin="0"
            colorDark="black"
            colorLight="white"
          >
          </vueQr>
          <img src="@/assets/img/code.png" slot="reference" />
        </el-popover>
      </div>
      <div class="basic-column">
        <div class="basic-column-item">
          <BasicTitle :title="languagePack.overview">
            <template #message>
              <div
                class="messageBasic column-basic"
                style="justify-content: flex-start"
              >
                <div class="column">
                  <p>{{ languagePack.totalbalance }}：</p>
                  <span>$ 131321313132</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.Price }}：</p>
                  <span>86</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.thetotalnumberoftransactions }}：</p>
                  <span>{{ account.tx_count }}</span>
                </div>
              </div>
            </template>
          </BasicTitle>
        </div>

        <div class="basic-column-item">
          <BasicTitle :title="languagePack.details">
            <template #message>
              <div class="messageBasic column-basic">
                <div class="column">
                  <p>{{ languagePack.availablebalance }}：</p>
                  <span>{{ account.balance | toMoney }} GHM</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.delegation }}：</p>
                  <span>{{ account.delegate_amount }} GHM</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.receivereward }}：</p>
                  <span>{{ account.rewards }} GHM</span>
                </div>

                <div class="column">
                  <p>{{ languagePack.unbind }}：</p>
                  <span>{{ account.withdraw_amount }}GHM</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.commission }}：</p>
                  <span>0</span>
                </div>
              </div>
            </template>
          </BasicTitle>
        </div>
        <!-- <div class="column-item">实时质押信息</div> -->
      </div>

      <!--表格-->
      <div class="detail-table">
        <div class="detail-table-header">
          <el-pagination
            small
            @current-change="handleCurrentChange"
            :current-page="page.currentPage + 1"
            :page-size="page.pageSize"
            layout="prev, pager, next"
            :total="txtotal"
            hide-on-single-page
          >
          </el-pagination>
        </div>
        <div class="detail-table-body">
          <el-table
            :data="TxsList"
            size="mini"
            height="612px"
            :header-cell-class-name="'tableHeaderCellStyle'"
            :row-class-name="'tableRowStyle'"
            :row-style="{ height: '58px !important' }"
            v-loading="loading"
          >
            <el-table-column width="48">
              <template slot-scope="scope">
                <div class="tableEyeBackground">
                  <el-popover
                    placement="right-start"
                    :offset="50"
                    :visible-arrow="true"
                    width="300px"
                    trigger="click"
                  >
                    <div class="popoverBox">
                      <div class="popoverBox_content">
                        <div class="popoverBox_title">
                          {{
                            languagePack.statussucceededfailedxxblocksconfirmed
                          }}
                        </div>
                        <div class="popStatus">
                          <div v-if="scope.row.result == 'success'">
                            <img src="@/assets/img/deal_succeed@2x.png" /><span
                              >成功</span
                            ><span>(X个区块确认)</span>
                          </div>
                          <div v-else>
                            <img src="@/assets/img/deal_lose@2x.png" /><span
                              >失败</span
                            ><span>(X个区块确认)</span>
                          </div>
                          <el-divider></el-divider>
                        </div>
                        <div v-for="(item, index) in statusTitle" :key="index">
                          <div class="popoverBox_title">{{ item.title }}</div>
                          <span v-if="index === 0"
                            >{{ scope.row.fee | toMoney }} GHM ($0.00)</span
                          >
                          <span v-if="index === 1"
                            >{{
                              scope.row.gas_wanted | toMoney
                            }}Gas总量中实际消耗{{
                              scope.row.gas_used | toMoney
                            }}Gas<br />@0.0004GHM</span
                          >
                          <span v-if="index === 2">{{
                            scope.row.sequence
                          }}</span>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <div
                        class="detailBox"
                        @click="queryDealtoHash(scope.row.txhash)"
                      >
                        查看详情
                      </div>
                    </div>
                    <img
                      slot="reference"
                      src="@/assets/img/table_eye_nor.png"
                      style="vertical-align: middle"
                    />
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="_id"
              :label="languagePack.transactionhash"
              width="180px"
            >
              <template slot-scope="scope">
                <TableTooltip :content="scope.row._id">
                  <template #icon>
                    <img
                      src="@/assets/img/table_mistake.png"
                      v-if="scope.row.result === 'error'"
                    />
                  </template>
                </TableTooltip>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.Method"
              width="100px"
              align="center"
            >
              <template slot-scope="scope">
                <div class="table_txOperate">{{ scope.row.type }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.BlockHeight">
              <template slot-scope="scope">
                <div class="specialFont">{{ scope.row.height }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="timestamp" :label="languagePack.time">
              <template slot-scope="scope">
                <div>{{ scope.row.timestamp | jetlag }}</div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.Sender"
              :show-overflow-tooltip="true"
              width="150px"
            >
              <template slot-scope="scope">
                <TableTooltip :content="scope.row.sender"></TableTooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" width="56px">
              <template slot-scope="scope">
                <div>
                  <img
                    src="@/assets/img/table_transmit.png"
                    alt=""
                    v-if="scope.row.result !== 'error'"
                  />
                  <span v-else class="table_txfail">self</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fuelTotal"
              :label="languagePack.Recipient"
              width="150px"
            >
              <template slot-scope="scope">
                <TableTooltip :content="scope.row.targetAddress"></TableTooltip>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.turnover">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.tx_amount | toMoney
                  }}<span v-if="!isNaN(scope.row.tx_amount)"> GHM</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.TransactionFee">
              <template slot-scope="scope">
                <div>{{ scope.row.fee | toMoney }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail-table-bottom">
          <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage + 1"
            :page-sizes="[10, 25, 50]"
            :page-size="page.pageSize"
            layout="prev, pager, next, sizes"
            :total="txtotal"
            hide-on-single-page
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryAccountInfo, queryAccountTx } from "@/api/account.js";
import mixin from "@/mixins";
import vueQr from "vue-qr";
export default {
  name: "addressDetail",
  mixins: [mixin],
  data() {
    return {
      loading: true,
      address: "",
      txtotal: 0,
      TxsList: [],
      hashList: [],
      account: {},
      page: {
        currentPage: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.address = this.$route.query.address;
    this.getAccountMsg();

    let { pageSize, currentPage } = this.page;
    this.getTxList(pageSize, currentPage);
  },
  methods: {
    async getAccountMsg() {
      const res = await queryAccountInfo(this.address);
      console.log("账户基本信息", res);
      this.account = res.data;
    },
    async getTxList(limit, index) {
      const txList = await queryAccountTx(limit, index, this.address);
      console.log("账户交易列表", txList);
      let arr = txList.data.list;

      // if(!arr) return
      this.disposeTableType(arr);
      this.TxsList = arr;
      this.txtotal = txList.data.total;
    },
    //分页
    handleSizeChange(val) {
      this.TxsList = [];
      this.getTxList((this.page.pageSize = val), (this.page.currentPage = 0));
    },
    handleCurrentChange(index) {
      this.page.currentPage = index - 1;
      let { pageSize, currentPage } = this.page;
      this.TxsList = [];
      this.getTxList(pageSize, currentPage);
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    statusTitle() {
      return [
        { title: this.languagePack.TransactionFee + ":" },
        { title: this.languagePack.GasInformation + ":" },
        { title: this.languagePack.GasUsed + ":" },
      ];
    },
  },
  watch: {
    TxsList(value) {
      if (!Array.isArray(value)) return (this.loading = false);
      this.loading = value.length == 0 ? true : false;
    },
  },
  components: { vueQr },
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

    img {
      margin-left:10px;
      cursor: pointer;
    }
  }

  .basic-column {
    margin: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-item {
      width: 632px;
      height: 296px;
    }

    .column-basic:nth-child(1) {
      height: 212px;

      .column {
        height: 40px;
        line-height: 40px;
      }
    }
  }

  &-table {
    width: 1280px;
    height: 732px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    &-header,
    &-bottom {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &-body {
      height: 612px;
    }

    .dealType {
      background: #f8f9fa;
      border: 1px solid #e9eaef;
      border-radius: 2px;
    }
  }
}

@media screen and (max-width: 598px) {
  .detail {
    width: 100%;

    .detail-title {
      padding-left: 8px;
      font-size: 12px;

      img {
        margin: 0;
      }
    }

    .basic-column {
      flex-direction: column;

      &-item {
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
<style>
  .qrcodeStyle{
    min-width: 80px !important;
  }
</style>