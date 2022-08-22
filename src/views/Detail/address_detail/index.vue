<template>
  <div class="address-detail">
    <div class="detail">
      <div class="detail-title">
        {{languagePack.address}}：{{ address
        }}<img src="@/assets/img/copy.png" @click="Copy(address)" /><img
          src="@/assets/img/code.png"
        />
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
                  <p>{{languagePack.totalbalance}}：</p>
                  <span
                    >${{ (avaliable.balances[0].amount * 86) | toMoney }}</span
                  >
                </div>
                <div class="column">
                  <p>{{languagePack.Price}}：</p>
                  <span>86</span>
                </div>
                <div class="column">
                  <p>{{languagePack.thetotalnumberoftransactions}}：</p>
                  <span>{{ pagination }}</span>
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
                  <p>{{languagePack.availablebalance}}：</p>
                  <span>{{ avaliable.balances[0].amount | toMoney }} GHM</span>
                </div>
                <div class="column">
                  <p>{{languagePack.delegation}}：</p>
                  <span
                    >{{
                      delegated.delegation_responses.length == 0
                        ? "0"
                        : (
                            delegated.delegation_responses[0].delegation
                              .shares * 1
                          ).toFixed(5)
                    }}
                    GHM</span
                  >
                </div>
                <div class="column">
                  <p>{{languagePack.receivereward}}：</p>
                  <span
                    >{{
                      reward.total.length == 0
                        ? 0
                        : (reward.total[0].amount * 1).toFixed(5)
                    }}
                    GHM</span
                  >
                </div>

                <div class="column">
                  <p>{{languagePack.unbind}}：</p>
                  <span
                    >{{
                      unbonding.length == 0 ? "0" : "unbonding  GHM"
                    }}GHM</span
                  >
                </div>
                <div class="column">
                  <p>{{languagePack.commission}}：</p>
                  <span>{{
                    unbonding.length == 0 ? "0" : "unbonding  GHM"
                  }}</span>
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 25, 50]"
            :page-size="pageSize"
            layout="prev, pager, next, sizes"
            :total="pagination"
          >
          </el-pagination>
        </div>
        <div class="detail-table-body">
          <el-table
            v-loading="loading"
            style="width: 100%"
            height="612px"
            size="mini"
            :data="TxsList"
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
                    placement="right-start"
                    :offset="50"
                    :visible-arrow="true"
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
                            >{{
                              scope.row.gas_wanted | toMoney
                            }}Gas总量中实际消耗{{
                              scope.row.gas_used | toMoney
                            }}Gas<br />@0.0004GHM</span
                          >
                          <span v-show="index === 2">{{
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
                    />
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.transactionhash" prop="txhash" width="180">
              <template slot-scope="scope">
                <p
                  class="specialFont"
                  @click="queryDealtoHash(hashList, scope.$index)"
                >
                  {{ scope.row.txhash | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.operationtype" align="center">
              <template slot-scope="scope">
                <div class="dealType">
                  {{ scope.row.type == "MsgSend" ? "转账" : scope.row.type }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.block">
              <template slot-scope="scope">
                <p class="specialFont">{{ scope.row.height | toMoney }}</p>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.time" prop="timestamp"></el-table-column>
            <el-table-column :label="languagePack.startaddress" width="168">
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
            <el-table-column :label="languagePack.targetaddress" width="168">
              <template slot-scope="scope">
                <p class="specialFont">
                  {{ scope.row.to_address | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.Transactions" width="186" align="right">
              <template slot-scope="scope">
                <div>
                  <p v-if="scope.row.amount">
                    {{ scope.row.amount | toMoney }} GHM
                  </p>
                  <p v-else>-</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.TransactionFee" align="center" width="163">
              <template slot-scope="scope">
                <div>{{ scope.row.fee | toMoney }} GHM</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail-table-bottom">
          <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 25, 50]"
            :page-size="pageSize"
            layout="prev, pager, next, sizes"
            :total="pagination"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { http } from "@/api/index.js";
import {
  adresBalance,
  getadresRewards,
  getadresDelegated,
  getAccountsBasis,
  getAddressTxs,
} from "@/api/api.js";
import mixin from "@/mixins";
export default {
  name: "addressDetail",
  mixins: [mixin],
  data() {
    return {
      loading:true,
      address: "",
      currentPage: 1,
      pageSize: 10, //初始每页数量
      pagination: 0,
      reward: {
        total: [{ amount: "" }],
      },
      avaliable: {
        balances: [{ amount: "" }],
      },
      delegated: {
        delegation_responses: [],
      },
      unbonding: [],
      TxsList: [],
      initTxsList: [],
      hashList: [],
      statusTitle: [
        { title: "手续费 :" },
        { title: "燃料信息 :" },
        { title: "随机数 :" },
      ],
    };
  },
  created() {
    this.address = this.$route.query.address;
    this.getAccountMsg(this.$route.query.address);
    this.getAccountsDeals(this.$route.query.address); //账户交易详情
  },
  methods: {
    async getAccountMsg(address) {
      // const res = await axios(http+`cosmos/auth/v1beta1/accounts/${address}`)
      const res2 = await adresBalance(address); //获取账户余额
      const res3 = await getadresRewards(address); //查询累积总奖励
      // const res4 = await axios(http+`/cosmos/distribution/v1beta1/delegators/${address}/validators`);//查询委托人的验证人
      // const res5 = await axios(http+`cosmos/distribution/v1beta1/delegators/${address}/withdraw_address`);// 撤销地址
      const res6 = await getadresDelegated(address); //根据地址查询所有委派
      // const res7 = await axios(http+`cosmos/staking/v1beta1/delegators/${address}/redelegations`);//查询给定地址的重新委派
      const res8 = await axios(
        http +
          `cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`
      ); //查询给定委派人地址的所有取消绑定委派。
      // const res9 = await axios(http+`/cosmos/staking/v1beta1/delegators/${address}/validators`);//通过地址查询所有验证人信息
      // console.log('res3', res3);
      // console.log('res2', res2);
      this.reward = res3;
      this.avaliable = res2;
      this.delegated = res6;

      this.unbonding = res8.data.unbonding_responses; //解除绑定期
      // console.log("解除绑定期", res8);
      // console.log("当前账户余额", res2);
      // console.log("查询累积总奖励", res3);
    },
    async getAccountsDeals(address) {
      //获取账户地址的交易信息
      let data = `message.sender='${address}'`;
      const res = await getAddressTxs(data);
      console.log("账户交易情况", res);
      let arr = [];
      const { tx_responses, pagination } = res;
      tx_responses.forEach((item) => {
        let { from_address, to_address, amount } = item.tx.body.messages[0];
        let type = item.tx.body.messages[0]["@type"].split(".").pop();
        switch (type) {
          case "MsgSend":
            type = "发送";
            break;
          case "MsgVote":
            type = "投票";
            break;
          case "MsgCreateValidator":
            type = "创建验证器";
            break;
          case "RaAuthenticate":
            type = "身份验证";
          default:
            break;
        }
        arr.push({
          txhash: item.txhash,
          type: type,
          height: item.height,
          timestamp: item.timestamp.slice(0, 10),
          from_address: from_address ?? this.address,
          to_address: to_address ?? "-",
          amount: amount ? amount[0].amount : "",
          fee: item.tx.auth_info.fee.amount[0].amount,
          gas_used: item.gas_used,
          gas_wanted: item.gas_wanted,
          sequence: item.tx.auth_info.signer_infos[0].sequence,
        });
      });
      console.log("处理完后的数组", arr);
      this.initTxsList = arr.reverse();
      this.hashList = this.initTxsList.map((item) => item.txhash);
      // console.log('hashList',this.hashList);
      this.TxsList = this.initTxsList.slice(0, this.pageSize);
      this.pagination = pagination.total * 1;
      setTimeout(()=>{
        this.loading = false
      },500)
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.TxsList = this.initTxsList.slice(0, val);
    },

    handleCurrentChange(val) {
      console.log(val);
      this.TxsList = this.initTxsList.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    },
  },
  computed: {
    languagePack(){
      return this.$store.state.Language
    }
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
