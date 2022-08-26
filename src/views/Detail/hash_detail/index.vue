<template>
  <div>
    <div class="hashdetail">
      <div class="title">
        <h3>{{ languagePack.transactiondetails }}</h3>
        <p class="specialFont">
          {{ Tx.hash }}
        </p>
        <div class="nextBtn">
          <span @click="lastData" :style="{ cursor: waitResult ? 'wait' : 'pointer' }"><i class="el-icon-arrow-left"></i></span>
          <span @click="nextData" :style="{ cursor: waitResult ? 'wait' : 'pointer' }"><i class="el-icon-arrow-right"></i></span>
        </div>
      </div>

      <BasicTitle :title="TxTitle">
        <!-- dealType === 'MsgWithdrawDelegatorReward'
            ? languagePack.receivereward
            : languagePack.contractexecution -->
        <template #message>
          <div class="messageBasic" style="height: 160px">
            <!-- 当该笔交易为合约执行时 -->
            <div class="column" v-if="dealType === 'MsgExecuteContract'">
              <p>{{ languagePack.executive }}：</p>
              <span class="specialFont">{{ detailed.perform }}</span>
            </div>
            <div class="column" v-if="dealType === 'MsgExecuteContract'">
              <p>{{ languagePack.contract }}：</p>
              <span>{{ detailed.contract }}</span>
            </div>

            <!-- 当该笔交易为转账时 -->
            <div class="column" v-if="dealType === 'MsgSend'">
              <p>{{ languagePack.sender }}：</p>
              <span class="specialFont">{{ detailed.perform }}</span>
            </div>
            <div class="column" v-if="dealType === 'MsgSend'">
              <p>{{ languagePack.receiver }}：</p>
              <span>{{ detailed.toaddress }}</span>
            </div>

            <!-- 当该笔交易为领取奖励时 -->
            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.delegate }}：</p>
              <span class="specialFont">{{ detailed.delegator_address }}</span>
            </div>

            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.receivedreward }}：</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>

            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.rewarddetails }}：</p>
              <span
                >从验证节点{{ detailed.validator_address }}领取奖励{{
                  detailed.turnover | toMoney
                }}
                GHM</span
              >
            </div>

            <!-- 当该笔交易为委托时 -->
            <div
              class="column"
              v-if="
                dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'
              "
            >
              <p>委托人：</p>
              <span class="specialFont">{{ detailed.delegator_address }}</span>
            </div>

            <div
              class="column"
              v-if="
                dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'
              "
            >
              <p>验证节点：</p>
              <span>{{ detailed.validator_address }} </span>
            </div>

            <div
              class="column"
              v-if="
                dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'
              "
            >
              <p>委托数量：</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>

            <!-- 当该笔交易为取消委托时 -->
            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>赎回人：</p>
              <span class="specialFont">{{ detailed.delegator_address }}</span>
            </div>

            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>验证节点：</p>
              <span>{{ detailed.validator_address }} </span>
            </div>

            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>赎回数量</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>

            <div
              class="column"
              v-if="
                dealType !== 'MsgWithdrawDelegatorReward' &&
                dealType !== 'MsgDelegate' &&
                dealType !== 'MsgUndelegate' &&
                dealType !== 'MsgBeginRedelegate'
              "
            >
              <p>{{ languagePack.Amount }}：</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>
            <div class="column">
              <p>{{ languagePack.TransactionFee }}：</p>
              <span>{{ detailed.poundage | toMoney }} GHM</span>
            </div>
          </div>
        </template>
      </BasicTitle>
      <div style="height: 16px" />
      <BasicTitle :title="languagePack.details">
        <template #message>
          <div class="messageBasic" style="height: 250px">
            <div class="column">
              <p>{{ languagePack.Txstatus }}：</p>
              <span
                :style="{
                  color: Tx.status === 'success' ? '#55c499' : '#ED422B',
                }"
                >{{ Tx.status == "error" ? "失败" : "成功" }}</span
              >
            </div>
            <div class="column">
              <p>{{ languagePack.transactionhash }}：</p>
              <span>{{ detailed.txhash }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.TimeStamp }}：</p>
              <span>{{ detailed.timestamp | timeStamp }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.blockheight }}：</p>
              <span style="color: #5671f2">{{ detailed.height }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.GasUsed }}：</p>
              <span>{{ detailed.gas_used }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.GasLimit }}：</p>
              <span>{{ detailed.gas_wanted }}</span>
            </div>
          </div>
        </template>
      </BasicTitle>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins";
import { pastTime, debounce } from "@/utils/common.js";
import { getHashContent } from "@/api/api.js";
export default {
  mixins: [mixin],
  data() {
    return {
      hashIndex: 0,
      detailed: {},
      dealType: "",
      waitResult:false
    };
  },
  created() {
    

    this.hashIndex = this.$route.params.index;
    const { hash, index } = this.$route.params;
    this.queryData(hash, index);
    // console.log(pastTime("2022-06-20T07:40:39Z"));
  },
  methods: {
    async queryData(hash, index) {
      this.waitResult = true
      const res = await getHashContent(hash[index].hash);
      console.log("通过hash查找信息", res);
      if(res){
        this.waitResult = false
      }
      const {
        tx_response: { txhash, timestamp, height, gas_used, gas_wanted },
        tx: { auth_info, body },
      } = res;
      let message = body.messages[0];
      this.dealType = message["@type"].split(".").pop();
      // console.log(auth_info,body);
      let obj = {
        poundage: auth_info.fee.amount[0].amount,
      };
      switch (this.dealType) {
        case "MsgSend":
          obj.perform = message.from_address;
          obj.turnover = message.amount[0].amount;
          obj.toaddress = message.to_address;
          break;
        case "MsgExecuteContract":
          obj.perform = message.sender;
          obj.contract = message.contract;
          break;
        case "MsgWithdrawDelegatorReward":
          obj.delegator_address = message.delegator_address;
          obj.validator_address = message.validator_address;
          break;
        case "MsgDelegate":
          obj.delegator_address = message.delegator_address;
          obj.turnover = message.amount.amount;
          obj.validator_address = message.validator_address;
          break;
        case "MsgUndelegate":
          obj.delegator_address = message.delegator_address;
          obj.turnover = message.amount.amount;
          obj.validator_address = message.validator_address;
          break;
        case "MsgBeginRedelegate":
          obj.delegator_address = message.delegator_address;
          obj.turnover = message.amount.amount;
          obj.validator_address = message.validator_dst_address;
          break;
        default:
          break;
      }
      this.detailed = {
        perform: "",
        status: "",
        txhash,
        timestamp,
        height,
        gas_used,
        gas_wanted,
        ...obj,
      };
      console.log(this.detailed);
    },

    lastData() {
      if (this.hashIndex == 0) return;
      this.hashIndex--;
    },
    nextData() {
      if (this.hashIndex == this.$route.params.hash.length - 1) return;
      this.hashIndex++;
    },
  },
  watch: {
    hashIndex(value) {
      const { hash } = this.$route.params;
      this.queryData(hash, value);
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    Tx() {
      return this.$route.params.hash[this.hashIndex];
    },
    TxTitle() {
      switch (this.dealType) {
        case "MsgUndelegate":
          return "赎回委托";
          break;
        case "MsgSend":
          return "转账";
          break;
        case "MsgWithdrawDelegatorReward":
          return "领取奖励";
          break;
        case "MsgDelegate":
          return "委托";
          break;
        case "MsgBeginRedelegate":
          return "重新委托";
          break;
        case "MsgExecuteContract":
          return "合约执行";
          break;
        case "vote":
          return "投票";
          break;
        case "MsgSetWithdrawAddress":
          return "设置领奖地址";
          break;
        case "MsgInstantiateContract":
          return "实例化合约";
          break;
        case "MsgStoreCode":
          return "上传合约";
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hashdetail {
  width: 1280px;
  margin: 0 auto;
  .title {
    padding: 16px 0;
    position: relative;

    > h3 {
      font-weight: 500;
      font-size: 20px;
      color: rgba(20, 37, 62, 0.85);
      padding-bottom: 8px;
    }
  }
  .nextBtn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    > span {
      background: #ffffff;
      border: 1px solid #e9eaef;
      border-radius: 2px;
      font-size: 12px;
      padding: 5px 7px;
      margin: 0 4px;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 598px) {
  .hashdetail {
    width: 100%;
  }
  .nextBtn {
    position: relative !important;
    transform: translateY(10%) !important;
  }
  .specialFont {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
