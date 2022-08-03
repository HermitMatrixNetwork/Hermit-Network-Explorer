<template>
  <div>
    <div class="hashdetail">
      <div class="title">
        <h3>交易详情</h3>
        <p class="specialFont">
          {{ $route.query.hash }}
        </p>
      </div>

      <BasicTitle :title="'合约执行'">
        <template #message>
          <div class="messageBasic" style="height: 160px">
            <div class="column">
              <p>执行方：</p>
              <span class="specialFont">{{ detailed.perform}}</span>
            </div>
            <div class="column">
              <p>合约：</p>
              <span>{{ detailed.contract }}</span>
            </div>
            <div class="column">
              <p>交易额：</p>
              <span>{{ detailed.turnover | toMoney}} GHM</span>
            </div>
            <div class="column">
              <p>手续费：</p>
              <span>{{ detailed.poundage | toMoney}} GHM</span>
            </div>
          </div>
        </template>
      </BasicTitle>
      <div style="height: 16px" />
      <BasicTitle :title="'详细信息'">
        <template #message>
          <div class="messageBasic" style="height: 250px">
            <div class="column">
              <p>状态：</p>
              <span style="color: #55c499">{{ detailed.status }}</span>
            </div>
            <div class="column">
              <p>交易哈希：</p>
              <span>{{ detailed.txhash }}</span>
            </div>
            <div class="column">
              <p>时间戳：</p>
              <span>{{ detailed.timestamp }}</span>
            </div>
            <div class="column">
              <p>区块高度：</p>
              <span>{{ detailed.height }}</span>
            </div>
            <div class="column">
              <p>燃料使用量：</p>
              <span>{{ detailed.gas_used }}</span>
            </div>
            <div class="column">
              <p>燃料总量：</p>
              <span>{{ detailed.gas_wanted }}</span>
            </div>
          </div>
        </template>
      </BasicTitle>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixins/index.vue'
import { getHashContent } from "@/api/api.js";
export default {
  mixins:[mixin],
  data() {
    return {
      detailed: {},
    };
  },
  created() {
    this.queryData();
  },
  methods: {
    async queryData() {
      const res = await getHashContent(this.$route.query.hash);
      console.log("通过hash查找信息", res);
      const {
        tx_response: { txhash, timestamp, height, gas_used, gas_wanted },
        tx: { auth_info, body },
      } = res;
      let message = body.messages[0];
      let dealType = message["@type"].split(".").pop();
      // console.log(auth_info,body);
      let obj = {
        perform: "",
        contract: "",
        turnover: "",
        poundage: auth_info.fee.amount[0].amount,
      };
      switch (dealType) {
        case "MsgSend":
          obj.perform = message.from_address;
          obj.turnover = message.amount[0].amount;
          break;
        case "MsgExecuteContract":
          obj.perform = message.sender;
          obj.contract = message.contract;
          break;
        default:
          break;
      }
      this.detailed = {
        perform: "",
        status: "成功",
        txhash,
        timestamp,
        height,
        gas_used,
        gas_wanted,
        ...obj,
      };
      console.log(this.detailed);
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
    > h3 {
      font-weight: 500;
      font-size: 20px;
      color: rgba(20, 37, 62, 0.85);
      padding-bottom: 8px;
    }
  }
}
</style>
