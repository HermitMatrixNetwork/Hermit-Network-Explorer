<template>
  <div class="pageBody">
    <div class="hashdetail">
      <div class="title">
        <h3>{{ languagePack.txstext20 }}</h3>
        <p>
          <span>{{ detailed.txhash }}</span><img src="@/assets/img/copy.png" @click="Copy(detailed.txhash)" />
        </p>
        <div class="nextBtn" v-if="hashList.length">
          <span
            @click="lastData"
            :style="{ cursor: waitResult ? 'wait' : 'pointer',color:hashIndex==0?'#14253E45':''  }"
            ><i class="el-icon-arrow-left"></i
          ></span>
          <span
            @click="nextData"
            :style="{ cursor: waitResult ? 'wait' : 'pointer',color:hashIndex==hashList.length - 1?'#14253E45':'' }"
            ><i class="el-icon-arrow-right"></i
          ></span>
        </div>
      </div>

      <BasicTitle :title="TxTitle">
        <!-- dealType === 'MsgWithdrawDelegatorReward'
            ? languagePack.receivereward
            : languagePack.contractexecution -->
        <template #message>
          <div class="messageBasic" :style="{height:detailed.memo?'200px':'160px'}">
            <!-- 当该笔交易为合约执行时 -->
            <div class="column" v-if="dealType === 'MsgExecuteContract'">
              <p>{{ languagePack.txstext22 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.perform)">{{ detailed.perform }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.perform)" />
            </div>
            <div class="column" v-if="dealType === 'MsgExecuteContract'">
              <p>{{ languagePack.txstext23 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.contract)">{{ detailed.contract }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.contract)" />
            </div>

            <!-- 当该笔交易为转账时 -->
            <div class="column" v-if="dealType === 'MsgSend'">
              <p>{{ languagePack.txstext35 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.perform)">{{ detailed.perform }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.perform)" />
            </div>
            <div class="column" v-if="dealType === 'MsgSend'">
              <p>{{ languagePack.txstext36 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.toaddress)">{{ detailed.toaddress }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.toaddress)" />
            </div>

            <!-- 当该笔交易为领取奖励时 -->
            <div class="column" v-if="dealType === 'MsgWithdrawDelegatorReward'">
              <p>{{ languagePack.txstext41 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.delegator_address)">{{ detailed.delegator_address }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.delegator_address)" />
            </div>

            <div class="column" v-if="dealType === 'MsgWithdrawDelegatorReward'">
              <p>{{ languagePack.txstext39 }}：</p>
              <span>{{ detailed.turnover / 1e6 }} GHM</span>
            </div>

            <div class="column" v-if="dealType === 'MsgWithdrawDelegatorReward'">
              <p>{{ languagePack.txstext40 }}：</p>
              <span>{{ languagePack.txstext59 }}{{ detailed.turnover / 1e6 }} GHM {{ languagePack.txstext60}}</span><span class="specialFont" @click="queryDealtoNode(detailed.validator_address)">{{ detailed.validator_address }} </span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.validator_address)" />

            </div>

            <!-- 当该笔交易为委托时 -->
            <div class="column" v-if="dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'">
              <p>{{ languagePack.txstext41 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.delegator_address)">{{ detailed.delegator_address }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.delegator_address)" />
            </div>

            <div class="column" v-if=" dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'">
              <p>{{ languagePack.txstext42 }}：</p>
              <span class="specialFont" @click="queryDealtoNode(detailed.validator_address)">{{ detailed.validator_address }} </span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.validator_address)" />
            </div>

            <div class="column" v-if="dealType === 'MsgDelegate' || dealType === 'MsgBeginRedelegate'">
              <p>{{ languagePack.txstext43 }}：</p>
              <span>{{ detailed.turnover ? detailed.turnover / 1e6 : 0 }} GHM</span>
            </div>

            <!-- 当该笔交易为取消委托时 -->
            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{ languagePack.txstext47 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.delegator_address)">{{ detailed.delegator_address }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.delegator_address)" />
            </div>

            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{ languagePack.txstext48 }}：</p>
              <span class="specialFont" @click="queryDealtoNode(detailed.validator_address)">{{ detailed.validator_address }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.validator_address)" />

            </div>

            <div class="column" v-if="dealType === 'MsgUndelegate'">
              <p>{{ languagePack.txstext49 }}：</p>
              <span>{{ detailed.turnover }} GHM</span>
            </div>

            <!-- 当为实例化合约时 -->
            <div class="column" v-if="dealType === 'MsgInstantiateContract'">
              <p>{{ languagePack.txstext22 }}：</p>
              <span class="specialFont">{{ detailed.contract }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.contract)" />
            </div>
            <div class="column" v-if="dealType === 'MsgInstantiateContract'">
              <p>{{ languagePack.txstext23 }}：</p>
              <span>{{ detailed.label }}</span>
            </div>

            <!-- 当为上传合约时 -->
            <div class="column" v-if="dealType === 'MsgStoreCode'">
              <p>{{ languagePack.txstext22 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.contract)">{{ detailed.contract }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.contract)" />
            </div>

            <!-- 当为设置领奖地址时 -->
            <div class="column" v-if="dealType === 'MsgSetWithdrawAddress'">
              <p>{{ languagePack.txstext53 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.contract)">{{ detailed.contract }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.contract)" />
            </div>
            <div class="column" v-if="dealType === 'MsgSetWithdrawAddress'">
              <p>{{ languagePack.txstext54 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.perform)">{{ detailed.perform }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.perform)" />
            </div>

            <!-- 当为创建验证器时 -->
            <div class="column" v-if="dealType === 'MsgCreateValidator'">
              <p>{{ languagePack.txstext51 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.contract)">{{ detailed.contract }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.contract)" />
            </div>
            <div class="column" v-if="dealType === 'MsgCreateValidator'">
              <p>{{ languagePack.txstext61 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.perform)">{{ detailed.perform }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.perform)" />
            </div>

            <div class="column" v-if="dealType === 'RaAuthenticate'">
              <p>{{ languagePack.txstext51 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.contract)">{{ detailed.contract }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.contract)" />
            </div>

            <div class="column" v-if="dealType === 'MsgUnjail'">
              <p>{{ languagePack.txstext61 }}：</p>
              <span class="specialFont" @click="queryDealtoAddress(detailed.contract)">{{ detailed.contract }}</span>
              <img src="@/assets/img/copy.png" @click="Copy(detailed.contract)" />
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
            <div class="column" v-if="detailed.memo">
              <p>Memo：</p>
              <span style="white-space: pre-wrap;">{{ detailed.memo }}</span>
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
              <el-tooltip effect="dark" :content="detailed.utc" placement="top">
                <span>{{ detailed.timestamp }}</span>
              </el-tooltip>
              
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
import { getHashContent } from "@/api/blockchain";
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
      // console.log("通过hash查找信息", res);
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
      } = res.data.list;
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
          obj.turnover = message.amount.amount / 1e6;
          obj.validator_address = message.validator_address;
          break;
        case "MsgBeginRedelegate":
          obj.delegator_address = message.delegator_address;
          obj.turnover = message.amount.amount / 1e6;
          obj.validator_address = message.validator_dst_address;
          break;
        case "MsgInstantiateContract":
          obj.contract = message.sender;
          obj.label = message.label
          break;
        case "MsgStoreCode":
          obj.contract = message.sender;
          obj.perform = message.builder;
          break;
        case "MsgSetWithdrawAddress":
          obj.contract = message.delegator_address;
          obj.perform = message.withdraw_address;
          break;
        case 'MsgCreateValidator':
          obj.contract = message.delegator_address
          obj.perform = message.validator_address
          break;
        case 'RaAuthenticate':
          obj.contract = message.sender
          break;
        case 'MsgUnjail':
          obj.contract = message.validator_addr;
          break;
        default:
          break;
      }
      this.detailed = {
        perform: "",
        txhash,
        timestamp: this.dealwithTime(timestamp),
        height,
        gas_used,
        gas_wanted,
        memo:body.memo,
        utc:'(UTC) '+timestamp.replace(/[A-Z]/g,' '),
        ...obj,
      };
      // console.log(this.detailed);
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
        case 'MsgCreateValidator':
          return this.languagePack.txstext62;
          break;
        case 'RaAuthenticate':
          return this.languagePack.txstext63;
          break;
        case 'MsgUnjail':
          return this.languagePack.txstext64;
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
.pageBody{
  width: 100vw;
  min-height: calc(100vh - 110px - 210px);
}
.hashdetail {
  width: 1280px;
  margin: 0 auto 80px;
  .title {
    color: #5671f2;
    font-weight: 600;
    font-size: 12px;
    padding: 16px 0;
    position: relative;

    > p {
      align-items: center;
      display: flex;
    }
    > h3 {
      font-size: 20px;
      color: rgba(20, 37, 62, 0.85);
      padding-bottom: 8px;
    }
    img {
      padding: 0 4px;
      cursor: pointer;
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
