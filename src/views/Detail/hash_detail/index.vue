<template>
  <div>
    <div class="hashdetail">
      <div class="title">
        <h3>{{ languagePack.txstext20 }}</h3>
        <p>
          <span class="specialFont">{{ detailed.txhash }}</span>
        </p>
        <div class="nextBtn" v-if="hashList.length">
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
              <p>{{ languagePack.txstext22 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.perform)"
                >{{ detailed.perform }}</span
              >
            </div>
            <div class="column" v-if="dealType === 'MsgExecuteContract'">
              <p>{{ languagePack.txstext23 }}：</p>
              <span class="specialFont">{{ detailed.contract }}</span>
            </div>

            <!-- 当该笔交易为转账时 -->
            <div class="column" v-if="dealType === 'MsgSend'">
              <p>{{ languagePack.txstext35 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.perform)"
                >{{ detailed.perform }}</span
              >
            </div>
            <div class="column" v-if="dealType === 'MsgSend'">
              <p>{{ languagePack.txstext36 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.toaddress)"
                >{{ detailed.toaddress }}</span
              >
            </div>

            <!-- 当该笔交易为领取奖励时 -->
            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.txstext41 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.delegator_address)"
                >{{ detailed.delegator_address }}</span
              >
            </div>

            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.txstext39 }}：</p>
              <span>{{ detailed.turnover / 1e6 }} GHM</span>
            </div>

            <div
              class="column"
              v-if="dealType === 'MsgWithdrawDelegatorReward'"
            >
              <p>{{ languagePack.txstext40 }}：</p>
              <span
                >从验证节点
                <span
                  class="specialFont"
                  @click="queryDealtoNode(detailed.validator_address)"
                  >{{ detailed.validator_address }} </span
                >领取奖励{{ detailed.turnover / 1e6 }} GHM</span
              >
            </div>

            <!-- 当该笔交易为委托时 -->
            <div
              class="column"
              v-if="
                dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'
              "
            >
              <p>{{ languagePack.txstext41 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.delegator_address)"
                >{{ detailed.delegator_address }}</span
              >
            </div>

            <div
              class="column"
              v-if="
                dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'
              "
            >
              <p>{{ languagePack.txstext42 }}：</p>
              <span>{{ detailed.validator_address }} </span>
            </div>

            <div
              class="column"
              v-if="
                dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'
              "
            >
              <p>{{ languagePack.txstext43 }}：</p>
              <span
                >{{ detailed.turnover ? detailed.turnover / 1e6 : 0 }} GHM</span
              >
            </div>

            <!-- 当该笔交易为取消委托时 -->
            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{ languagePack.txstext47 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.delegator_address)"
                >{{ detailed.delegator_address }}</span
              >
            </div>

            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{ languagePack.txstext48 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoNode(detailed.validator_address)"
                >{{ detailed.validator_address }}
              </span>
            </div>

            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{ languagePack.txstext49 }}：</p>
              <span>{{ detailed.turnover | toMoney }} GHM</span>
            </div>

            <!-- 当为实例化合约时 -->
            <div class="column" v-if="dealType === 'MsgInstantiateContract'">
              <p>{{ languagePack.txstext22 }}：</p>
              <span class="specialFont">{{ detailed.contract }}</span>
            </div>
            <div class="column" v-if="dealType === 'MsgInstantiateContract'">
              <p>{{ languagePack.txstext23 }}：</p>
              <span>{{ detailed.contract }}</span>
            </div>

            <!-- 当为上传合约时 -->
            <div class="column" v-if="dealType === 'MsgStoreCode'">
              <p>{{ languagePack.txstext22 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.contract)"
                >{{ detailed.contract }}</span
              >
            </div>
            <div class="column" v-if="dealType === 'MsgStoreCode'">
              <p>构建：</p>
              <span>{{ detailed.perform }}</span>
            </div>

            <!-- 当为设置领奖地址时 -->
            <div class="column" v-if="dealType === 'MsgSetWithdrawAddress'">
              <p>{{ languagePack.txstext53 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.contract)"
                >{{ detailed.contract }}</span
              >
            </div>
            <div class="column" v-if="dealType === 'MsgSetWithdrawAddress'">
              <p>{{ languagePack.txstext54 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoAddress(detailed.perform)"
                >{{ detailed.perform }}</span
              >
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
              <p>{{ languagePack.txstext24 }}：</p>
              <span
                >{{ detailed.turnover ? detailed.turnover / 1e6 : 0 }} GHM</span
              >
            </div>
            <div class="column">
              <p>{{ languagePack.txstext25 }}：</p>
              <span>{{ detailed.poundage / 1e6 }} GHM</span>
            </div>
          </div>
        </template>
      </BasicTitle>
      <div style="height: 16px" />
      <BasicTitle :title="languagePack.txstext27">
        <template #message>
          <div class="messageBasic" style="height: 250px">
            <div class="column">
              <p>{{ languagePack.txstext28 }}：</p>
              <span
                :style="{
                  color:
                    (TxStatus ? TxStatus : QtxStatus) == 'success'
                      ? '#55c499'
                      : '#ED422B',
                }"
                >{{
                  (TxStatus ? TxStatus : QtxStatus) == "success"
                    ? languagePack.prompttext02
                    : languagePack.prompttext03
                }}</span
              >
            </div>
            <div class="column">
              <p>{{ languagePack.txstext29 }}：</p>
              <span>{{ detailed.txhash }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.txstext30 }}：</p>
              <span>{{ detailed.timestamp }} +UTC</span>
            </div>
            <div class="column">
              <p>{{ languagePack.txstext31 }}：</p>
              <span
                class="specialFont"
                @click="queryDealtoBlock(detailed.height)"
                >{{ detailed.height }}</span
              >
            </div>
            <div class="column">
              <p>{{ languagePack.txstext32 }}：</p>
              <span>{{ detailed.gas_used }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.txstext33 }}：</p>
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
      hashIndex: sessionStorage.getItem("hashList")
        ? JSON.parse(sessionStorage.getItem("hashList")).index
        : false,
      detailed: {},
      dealType: "",
      waitResult: false,
      QtxStatus: "success",
      hashList: sessionStorage.getItem("hashList")
        ? JSON.parse(sessionStorage.getItem("hashList")).hashList
        : [],
    };
  },
  created() {
    if (this.$route.query.hash) {
      console.log(this.$route.query.hash);
      return this.queryData(JSON.parse(this.$route.query.hash));
    }
    this.queryData(this.hashList, this.hashIndex);
  },
  methods: {
    async queryData(hash, index, status) {
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
        tx_response: {
          txhash,
          timestamp,
          height,
          gas_used,
          gas_wanted,
          events,
          logs,
        },
        tx: { auth_info, body },
      } = res;
      let message = body.messages[0];
      //如果没有交易状态或者交易状态为undifind时通过events来判断交易状态
      if (!this.TxStatus) {
        this.queryStatus(events);
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
          obj.turnover = logs[0].events[0].attributes
            .pop()
            .value.replace(/[a-zA-Z]/g, "");
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
          break;
        case "MsgSetWithdrawAddress":
          obj.contract = message.delegator_address;
          obj.perform = message.withdraw_address;
        default:
          break;
      }
      this.detailed = {
        perform: "",
        txhash,
        timestamp: timestamp.replace(/[A-Z]/g, " "),
        height,
        gas_used,
        gas_wanted,
        ...obj,
      };
      console.log(this.detailed);
    },

    lastData() {
      this.$router.push({ query: null }).catch((e) => {});
      if (this.hashIndex == 0) return;
      sessionStorage.setItem(
        "hashList",
        JSON.stringify({ hashList: this.hashList, index: --this.hashIndex })
      );
    },
    nextData() {
      this.$router.push({ query: null }).catch((e) => {});
      if (this.hashIndex == this.hashList.length - 1) return;
      sessionStorage.setItem(
        "hashList",
        JSON.stringify({ hashList: this.hashList, index: ++this.hashIndex })
      );
    },
    queryStatus(arr) {
      let arr2 = arr.map((e) => {
        return e.attributes.map((i) => {
          return i.index;
        });
      });
      if (!arr2.flat().indexOf(false)) {
        this.QtxStatus = "error";
      }
    },
    queryDealtoNode(val) {
      this.$router.push({ name: "node_detail", query: { address: val } });
    },
  },
  watch: {
    hashIndex(value) {
      // if(value)
      const { hash } = this.$route.params;
      if (hash) {
        this.queryData(hash, value);
      } else {
        this.queryData(this.hashList, value);
      }
    },
    "$route.query": {
      handler(val) {
        if (val.hash) {
          // console.log('query中的hash',val);
          // console.log("通过query", JSON.parse(val.hash).hash);
          this.queryData(JSON.parse(val.hash));
        }
      },
      // deep: true,
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    TxTitle() {
      switch (this.dealType) {
        case "MsgUndelegate":
          return this.languagePack.txstext46;
          break;
        case "MsgSend":
          return this.languagePack.txstext34;
          break;
        case "MsgWithdrawDelegatorReward":
          return this.languagePack.txstext37;
          break;
        case "MsgDelegate":
          return this.languagePack.txstext38;
          break;
        case "MsgBeginRedelegate":
          return this.languagePack.txstext58;
          break;
        case "MsgExecuteContract":
          return this.languagePack.txstext21;
          break;
        case "vote":
          return this.languagePack.txstext50;
          break;
        case "MsgSetWithdrawAddress":
          return this.languagePack.txstext55;
          break;
        case "MsgInstantiateContract":
          return this.languagePack.txstext56;
          break;
        case "MsgStoreCode":
          return this.languagePack.txstext57;
          break;
        default:
          break;
      }
    },
    TxStatus() {
      if (this.$route.query.hash) return false;
      if (this.hashIndex) {
        return this.hashList[this.hashIndex].status;
      } else {
        return false;
      }
    },
  },
  destroyed() {
    // if (this.$route.query) {
      // this.$router.push({ query: null }).catch((e) => {});
    // }
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
    .column {
      overflow: hidden;
      text-overflow: ellipsis;
      > p {
        width: auto;
      }
    }
    .title {
      padding-left: 16px;
      h3 {
        padding: 0;
      }
      p {
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
