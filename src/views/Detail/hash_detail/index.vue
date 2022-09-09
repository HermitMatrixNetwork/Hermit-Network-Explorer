<template>
  <div>
    <div class="hashdetail">
      <div class="title">
        <h3>{{ languagePack.tsxtext20 }}</h3>
        <p class="specialFont">
          {{ detailed.txhash }}
        </p>
        <div class="nextBtn">
          <span
            @click="lastData"
            :style="{ cursor: waitResult ? 'wait' : 'pointer' }"
            ><i class="el-icon-arrow-left"></i
          ></span>
          <span
            @click="nextData"
            :style="{ cursor: waitResult ? 'wait' : 'pointer' }"
            ><i class="el-icon-arrow-right"></i
          ></span>
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
              <p>{{ languagePack.tsxtext22 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.perform)">{{ detailed.perform }}</span>
            </div>
            <div class="column" v-if="dealType === 'MsgExecuteContract'">
              <p>{{ languagePack.tsxtext23 }}：</p>
              <span>{{ detailed.contract }}</span>
            </div>

            <!-- 当该笔交易为转账时 -->
            <div class="column" v-if="dealType === 'MsgSend'">
              <p>{{ languagePack.tsxtext35 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.perform)">{{ detailed.perform }}</span>
            </div>
            <div class="column" v-if="dealType === 'MsgSend'">
              <p>{{ languagePack.tsxtext36 }}：</p>
              <span>{{ detailed.toaddress }}</span>
            </div>

            <!-- 当该笔交易为领取奖励时 -->
            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.tsxtext41 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.delegator_address)">{{ detailed.delegator_address }}</span>
            </div>

            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.tsxtext39 }}：</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>

            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.tsxtext40 }}：</p>
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
              <p>{{languagePack.tsxtext41}}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.delegator_address)">{{ detailed.delegator_address }}</span>
            </div>

            <div
              class="column"
              v-if="
                dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'
              "
            >
              <p>{{languagePack.tsxtext42}}：</p>
              <span>{{ detailed.validator_address }} </span>
            </div>

            <div
              class="column"
              v-if="
                dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'
              "
            >
              <p>{{languagePack.tsxtext43}}：</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>

            <!-- 当该笔交易为取消委托时 -->
            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{languagePack.tsxtext47}}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.delegator_address)">{{ detailed.delegator_address }}</span>
            </div>

            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{languagePack.tsxtext48}}：</p>
              <span>{{ detailed.validator_address }} </span>
            </div>

            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{languagePack.tsxtext49}}：</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>

            <!-- 当为实例化合约时 -->
            <div class="column" v-if="dealType === 'MsgInstantiateContract'">
              <p>{{ languagePack.tsxtext22 }}：</p>
              <span class="specialFont">{{ detailed.contract }}</span>
            </div>
            <div class="column" v-if="dealType === 'MsgInstantiateContract'">
              <p>{{ languagePack.tsxtext23 }}：</p>
              <span>{{ detailed.contract }}</span>
            </div>

            <!-- 当为上传合约时 -->
            <div class="column" v-if="dealType === 'MsgStoreCode'">
              <p>{{ languagePack.tsxtext22 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.contract)">{{ detailed.contract }}</span>
            </div>
            <div class="column" v-if="dealType === 'MsgStoreCode'">
              <p>构建：</p>
              <span>{{ detailed.perform }}</span>
            </div>

            <!-- 当为设置领奖地址时 -->
            <div class="column" v-if="dealType === 'MsgSetWithdrawAddress'">
              <p>质押地址：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.contract)">{{ detailed.contract }}</span>
            </div>
            <div class="column" v-if="dealType === 'MsgSetWithdrawAddress'">
              <p>领奖地址：</p>
              <span>{{ detailed.perform }}</span>
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
              <p>{{ languagePack.tsxtext24 }}：</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>
            <div class="column">
              <p>{{ languagePack.tsxtext25 }}：</p>
              <span>{{ (detailed.poundage/1e6) }} GHM</span>
            </div>
          </div>
        </template>
      </BasicTitle>
      <div style="height: 16px" />
      <BasicTitle :title="languagePack.tsxtext27">
        <template #message>
          <div class="messageBasic" style="height: 250px">
            <div class="column">
              <p>{{ languagePack.tsxtext28 }}：</p>
              <span
                :style="{
                  color: (TxStatus?TxStatus:QtxStatus) == 'success' ? '#55c499' : '#ED422B',
                }"
                >{{ (TxStatus?TxStatus:QtxStatus) == "success" ? languagePack.prompttext02 : languagePack.prompttext03 }}</span
              >
            </div>
            <div class="column">
              <p>{{ languagePack.tsxtext29 }}：</p>
              <span>{{ detailed.txhash }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.tsxtext30 }}：</p>
              <span>{{ detailed.timestamp | timeStamp }} +UTC</span>
            </div>
            <div class="column">
              <p>{{ languagePack.tsxtext31 }}：</p>
              <span class="specialFont" @click="queryDealtoBlock(detailed.height)">{{ detailed.height }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.tsxtext32 }}：</p>
              <span>{{ detailed.gas_used }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.tsxtext33 }}：</p>
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
import { getHashContent } from "@/api/api.js";
export default {
  mixins: [mixin],
  data() {
    return {
      hashIndex: 0,
      detailed: {},
      dealType: "",
      waitResult: false,
      QtxStatus:'success',
    };
  },
  created() {
    console.log(this.$route);
    this.hashIndex = this.$route.params.index;
    const { hash, index } = this.$route.params;
    this.queryData(hash, index);
  },
  methods: {
    async queryData(hash, index,status) {
      this.waitResult = true;
      let res;
      if (!Array.isArray(hash)) {
        res = await getHashContent(hash.hash);
      } else {
        res = await getHashContent(hash[index].hash);
      }
      console.log("通过hash查找信息", res);
      if (res) {
        this.waitResult = false;
      }
      const {
        tx_response: { txhash, timestamp, height, gas_used, gas_wanted,events },
        tx: { auth_info, body },
      } = res;
      let message = body.messages[0];
      //如果没有交易状态或者交易状态为undifind时通过events来判断交易状态
      if(!this.TxStatus){
        this.queryStatus(events)
      }
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
        case "MsgInstantiateContract":
          obj.contract = message.sender;
          break;
        case "MsgStoreCode":
          obj.contract = message.sender;
          obj.perform = message.builder;
          break
          case 'MsgSetWithdrawAddress':
            obj.contract = message.delegator_address
            obj.perform = message.withdraw_address
        default:
          break;
      }
      this.detailed = {
        perform: "",
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
      // this.$router.push({query:{hash:false}})
      if (this.hashIndex == this.$route.params.hash.length - 1) return;
      this.hashIndex++;
    },
    queryStatus(arr){
      let arr2 = arr.map(e=>{
        return e.attributes.map(i=>{
          return i.index
        })
      })
      if(!arr2.flat().indexOf(false)){
        this.QtxStatus = 'error'
      }
    }
  },
  watch: {
    hashIndex(value) {
      // if(value)
      const { hash } = this.$route.params;
      this.queryData(hash, value);
    },
    '$route.query':{
      handler(val){
        this.queryData(val.hash)
      },
      deep:true
    }
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    Tx() {
      let {hash} = this.$route.query
      if(hash){
        return hash
      }
      return this.$route.params.hash[this.hashIndex];
    },
    TxTitle() {
      switch (this.dealType) {
        case "MsgUndelegate":
          return this.languagePack.tsxtext46;
          break;
        case "MsgSend":
          return this.languagePack.tsxtext34;
          break;
        case "MsgWithdrawDelegatorReward":
          return this.languagePack.tsxtext37;
          break;
        case "MsgDelegate":
          return this.languagePack.tsxtext38;
          break;
        case "MsgBeginRedelegate":
          return "重新委托";
          break;
        case "MsgExecuteContract":
          return this.languagePack.tsxtext21;
          break;
        case "vote":
          return this.languagePack.tsxtext50;
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
    TxStatus(){
      let {hash} = this.$route.params
      if(Array.isArray(hash)){
        return hash[this.hashIndex].status
      }else{
        return hash.status
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
.hashdetail {
  width: 1280px;
  margin: 0 auto 80px;
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
    .column{
      overflow: hidden;
      text-overflow: ellipsis;
      >p{
        width: auto;
      }
    }
    .title{
      padding-left: 16px;
      h3{
        padding: 0;
      }
      p{
        white-space: pre-wrap;
        height: auto;
        line-height: 1;
        padding-bottom: 16px;
      }
    }
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
