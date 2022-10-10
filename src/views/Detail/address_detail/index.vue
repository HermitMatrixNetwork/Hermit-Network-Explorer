<template>
  <div class="address-detail">
    <div class="detail">
      <div class="detail-title">
        {{ languagePack.accounttext14 }}：{{ address
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
          <BasicTitle :title="languagePack.accounttext15">
            <template #message>
              <div
                class="messageBasic column-basic"
                style="justify-content: flex-start"
              >
                <div class="column">
                  <p>{{ languagePack.accounttext17 }}：</p>
                  <span
                    >{{
                      TotalBalance(
                        account.balance / 1e6,
                        account.delegate_amount,
                        account.unbonding
                      )
                    }}
                    GHM</span
                  >
                </div>
                <div class="column">
                  <p>{{ languagePack.accounttext18 }}：</p>
                  <span
                    >$
                    {{
                      (($store.state.tokenPrice * account.balance) / 1e6)
                        | toMoney
                    }}</span
                  >
                </div>
                <div class="column">
                  <p>{{ languagePack.accounttext20 }}：</p>
                  <span>{{ account.txCount?account.txCount:0 }}</span>
                </div>
              </div>
            </template>
          </BasicTitle>
        </div>

        <div class="basic-column-item">
          <BasicTitle :title="languagePack.accounttext21">
            <template #message>
              <div class="messageBasic column-basic">
                <div class="column">
                  <p>{{ languagePack.accounttext22 }}：</p>
                  <span>{{ account.balance / 1e6 }} GHM</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.accounttext23 }}：</p>
                  <span>{{ account.delegate_amount }} GHM</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.accounttext24 }}：</p>
                  <span>{{ account.withdrawAmount?account.withdrawAmount/1e6:0 }} GHM</span>
                </div>

                <div class="column">
                  <p>{{ languagePack.accounttext26 }}：</p>
                  <span>{{ account.unbonding }} GHM</span>
                </div>
                <div class="column">
                  <p>{{ languagePack.accounttext27 }}：</p>
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
            :header-cell-class-name="'tableHeaderCellStyle'"
            :row-class-name="'tableRowStyle'"
            :row-style="{ height: '58px !important' }"
            v-loading="loading"
          >
            <div slot="empty">{{ languagePack.prompttext11 }}</div>
            <el-table-column width="48">
              <template slot-scope="scope">
                <div class="tableEyeBackground">
              <el-popover
                placement="right-start"
                :offset="50"
                :visible-arrow="true"
                width="300px"
                trigger="manual"
                v-model="scope.row.eyePopover"
              >
                <div class="popoverBox">
                  <div class="popoverBox_content">
                    <div style="height:28px;line-height:28px;">
                      {{ languagePack.txstext13 }}
                    </div>
                    <div class="popStatus">
                      <div v-if="scope.row.result == 'success'">
                        <img src="@/assets/img/deal_succeed@2x.png" /><span
                          >{{languagePack.prompttext02}}</span
                        ><span></span>
                      </div>
                      <div v-else>
                        <img src="@/assets/img/deal_lose@2x.png" /><span
                          >{{languagePack.prompttext03}}</span
                        ><span></span>
                      </div>

                      <el-divider></el-divider>
                    </div>
                    <div
                      v-for="(item, index) in statusTitle"
                      :key="index"
                    >
                      <div style="height:28px;line-height:28px;">{{ item.title }}</div>
                      <span v-show="index === 0"
                        >{{ scope.row.fee/1e6 }} GHM ($0.00)</span
                      >
                      <span v-show="index === 1"
                        >{{ scope.row.gas_wanted | toMoney }}Gas总量中实际消耗{{
                          scope.row.gas_used | toMoney
                        }}Gas<br /> {{(scope.row.gas_used*scope.row.fee/scope.row.gas_wanted/1e6).toFixed(6)}}GHM </span> <!---->
                      <span v-show="index === 2">{{scope.row.sequence}}</span>

                      <el-divider></el-divider>
                    </div>
                  </div>
                  <div class="detailBox" @click="queryTxDetail(scope.$index)">
                    {{languagePack.prompttext10}}
                  </div>
                </div>
                <img slot="reference"  @focus="scope.row.eyePopover = true" @blur="scope.row.eyePopover = false" width="14" src="@/assets/img/table_eye_nor@2x.png" />
              </el-popover>
            </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="_id"
              :label="languagePack.accounttext29"
              width="180px"
            >
              <template slot-scope="scope">
                <div class="specialFont" @click="queryTxDetail(scope.$index)">
                  <el-tooltip
                    effect="dark"
                    :content="languagePack.prompttext05"
                    placement="top"
                  >
                    <img
                      src="@/assets/img/table_mistake@2x.png"
                      v-if="scope.row.result === 'error'"
                      width="14"
                      @click.stop
                    />
                  </el-tooltip>
                  {{ scope.row._id | sliceAddress }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.accounttext30"
              width="220px"
              align="center"
            >
              <template slot-scope="scope">
                <span class="table_txOperate">{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.accounttext31">
              <template slot-scope="scope">
                <div class="specialFont" @click="queryDealtoBlock(scope.row.height)">
                  {{ scope.row.height }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="timestamp"
              :label="languagePack.accounttext32"
            >
              <template slot-scope="scope">
                <div>{{ TimeStamp(scope.row.timestamp) }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.accounttext33" width="150px">
              <template slot-scope="scope">
                <TableTooltip :content="scope.row.sender"></TableTooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" width="56px">
              <template slot-scope="scope">
                <div>
                  <img
                    src="@/assets/img/table_transmit@2x.png"
                    alt=""
                    v-if="scope.row.result !== 'error'"
                    width="20"
                  />
                  <span v-else class="table_txfail">self</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.accounttext34" width="150px">
              <template slot-scope="scope">
                <TableTooltip
                  v-if="scope.row.targetAddress"
                  :content="scope.row.targetAddress"
                  @click.native="toAddress(scope.row.targetAddress)"
                ></TableTooltip>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.accounttext35">
              <template slot-scope="scope">
                <div>
                  {{ isNaN(scope.row.tx_amount) ? 0 : scope.row.tx_amount
                  }}<span v-if="!isNaN(scope.row.tx_amount)"> GHM</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.accounttext36" min-width="90px" align="center">
              <template slot-scope="scope">
                <div>{{ scope.row.fee / 1e6 }}</div>
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
import {
  getadresRewards,
  getadresUnbonding,
  getadresDelegated,
} from "@/api/api.js";
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
      account: {
        balance: 0,
        delegate_amount: 0,
        rewards: 0,
        unbonding: 0,
      },
      page: {
        currentPage: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.address = this.$route.query.address;
    const noquery = this.$route.query.noquery
    // console.log(this.$route.query);
    if(noquery){
      this.TxsList = []
      return
    }
    this.getAccountMsg();
    let { pageSize, currentPage } = this.page;
    this.getTxList(pageSize, currentPage);
  },
  methods: {
    async getAccountMsg() {
      const res = await Promise.all([
        queryAccountInfo(this.address),
        getadresDelegated(this.address),
        getadresRewards(this.address),
        getadresUnbonding(this.address),
      ]);
      console.log(res);
      let delegate_amount = 0;
      if (res[1].delegation_responses.length !== 0) {
        res[1].delegation_responses.forEach((item) => {
          delegate_amount += item.balance.amount * 1;
        });
      }else{
        delegate_amount = 0
      }
      let rewards = res[2].total[0]?res[2].total[0].amount:0;
      let unbonding = 0;
      res[3].unbonding_responses.forEach((item) => {
        item.entries.map((e) => {
          unbonding += e.balance * 1;
        });
      });
      // console.log(unbonding);
      this.account = {
        ...res[0].data,
        delegate_amount: delegate_amount / 1e6,
        rewards: rewards / 1e6,
        unbonding: unbonding / 1e6,
      };
    },
    async getTxList(limit, index) {
      let { data:{list,total} } = await queryAccountTx(limit, index, this.address);;
      // console.log("交易", list);
      // console.log(total);
      let arr = []
      this.hashList = []
      if(list.length >= 1){
        list.forEach(({tx_response:{txhash,height,timestamp,gas_used,gas_wanted,logs,events},tx:{auth_info,body:{messages}}})=>{
        let {amount,from_address,to_address,delegator_address,validator_address,withdraw_address,sender,contract} = messages[0]
        let type = messages[0]['@type'].split('.').pop()
        let reward = type === 'MsgWithdrawDelegatorReward'?logs[0].events[0].attributes.pop().value.replace(/[a-zA-Z]/g, ""):0
        // let status = 
        
        let statusArr = events.map((e) => {
            return e.attributes.map((i) => {
                return i.index;
            }); 
        });
        let result = statusArr.flat().includes(false)?'error':'success'
        arr.push({
          _id:txhash,
          type,
          height,
          timestamp,
          sender:from_address || delegator_address || sender,
          targetAddress:to_address || validator_address || withdraw_address || contract,
          tx_amount:(type === 'MsgWithdrawDelegatorReward'?reward:amount?amount.amount?amount.amount:amount[0].amount:0)/1e6,
          fee:auth_info.fee.amount[0].amount,
          result,
          gas_used,
          gas_wanted,
          sequence:auth_info.signer_infos[0].sequence,
          eyePopover:false
        })
        this.hashList.push({
          hash: txhash, type: type, status:result
        }) 
      })
      }
      this.TxsList = arr;
      this.txtotal = total
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
    //查看交易详情
    queryTxDetail(index) {
      console.log(this.hashList, index);
      sessionStorage.setItem(
        "hashList",
        JSON.stringify({ hashList: this.hashList, index })
      );
      this.$router.push({ name: "hash_detail" });
    },
    toAddress(address){
      if(address.includes('valoper')){
        return this.$router.push({path:'/node_detail',query:{address}})
      }
      this.$router.push({ path: "/address_detail", query: { address } });
    }
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    statusTitle() {
      return [
        { title: this.languagePack.accounttext36 + ":" },
        { title: this.languagePack.txstext15 + ":" },
        { title: this.languagePack.txstext17 + ":" },
      ];
    },
    TotalBalance() {
      return function (...args) {
        return args.reduce((a, b) => {
          return a * 1 + b * 1;
        });
      };
    },
  },
  watch: {
    TxsList(value) {
      // if (!Array.isArray(value)) return (this.loading = false);
      if (Array.isArray(value)) {
        this.loading = value.length == 0 ? true : false;
        setTimeout(()=>{
          this.loading = false
        },1500)
      } else {
        this.loading = false;
      }
    },
    "$route.query"(val) {
      this.address = this.$route.query.address;
      this.getAccountMsg();
      let { pageSize, currentPage } = this.page;
      this.getTxList(pageSize, currentPage);
    },
  },
  components: { vueQr },
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
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: rgba(20, 37, 62, 0.85);

    img {
      margin-left: 10px;
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
    // height: 732px;
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
      min-height: 612px;
      .el-table{
        min-height: 612px;

      }
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
.qrcodeStyle {
  min-width: 80px !important;
  z-index: 3336 !important;
}
</style>
