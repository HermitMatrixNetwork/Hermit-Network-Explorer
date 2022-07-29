<template>
  <div class="address-detail">
    <div class="detail">
      <div class="detail-title">
        地址：{{ address
        }}<img src="@/assets/img/copy.png" @click="Copy(address)" /><img
          src="@/assets/img/code.png"
        />
      </div>
      <div class="column">
        <div class="column-item" v-for="(item, index) in nodeData" :key="index">
          <BasicTitle :title="item.title">
            <template #message>
              <div class="column-basic">
                <p v-for="(value, key) in item.basic" :key="key">
                  {{ key }}:{{ value }}
                </p>
              </div>
            </template>
          </BasicTitle>
        </div>
        <!-- <div class="column-item">实时质押信息</div> -->
      </div>

      <!--表格-->
      <div class="detail-table">
        <div class="detail-table-header"></div>
        <div class="detail-table-body">
          <el-table
            style="width: 100%"
            size="mini"
            :data="list"
            :header-cell-style="{
              background: '#F8FAFB',
              color: 'rgba(20,37,62,0.45)',
            }"
          >
            <el-table-column width="48">
              <template>
                <div>
                  <img src="@/assets/img/code.png" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="交易哈希"
              prop="transHash"
              width="180"
            ></el-table-column>
            <el-table-column label="操作类型" align="center">
              <template slot-scope="scope">
                <button>{{ scope.row.type }}</button>
              </template>
            </el-table-column>
            <el-table-column label="区块" prop="block"></el-table-column>
            <el-table-column label="时长" prop="timer"></el-table-column>
            <el-table-column
              label="发起地址"
              prop="adress"
              width="148"
            ></el-table-column>
            <el-table-column width="57">
              <template>
                <div>
                  <img src="@/assets/img/code.png" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="目标地址"
              prop="targetAdress"
              width="148"
            ></el-table-column>
            <el-table-column
              label="交易额"
              prop="transValue"
              width="186"
              align="right"
            ></el-table-column>
            <el-table-column
              label="手续费（GHM）"
              prop="poundage"
              align="center"
              width="163"
            ></el-table-column>
          </el-table>
        </div>
        <div class="detail-table-bottom"></div>
      </div>
    </div>

    <p>Available {{ avaliable.balances[0].amount }}</p>
    可用
    <br />
    Delegated
    <p
      v-text="
        delegated.delegation_responses.length == 0
          ? '0'
          : delegated.delegation_responses[0].delegation.shares
      "
    ></p>
    委托
    <br />
    Rewards
    <p v-text="reward.total.length == 0 ? 0 : reward.total[0].amount"></p>
    奖励
    <p>Unbonding {{}}</p>
    <!--解除绑定-->
    <p>Commission {{}}</p>
    <!--委员会-->
    <h3>Total {{ total }}</h3>
    <!--一共-->
  </div>
</template>

<script>
import axios from "axios";
import { http } from "@/api/index.js";
import { adresBalance, getadresRewards, getadresDelegated } from "@/api/api.js";
import mixin from "@/mixins/index.vue";
export default {
  mixins: [mixin],
  data() {
    return {
      address: "",
      reward: {
        total: [{ amount: "" }],
      },
      avaliable: {
        balances: [{ amount: "" }],
      },
      delegated: {
        delegation_responses: [],
      },
      nodeData: [
        {
          title: "概览",
          basic: {
            总余额: 253,
            GHM价格: 86,
            总交易次数: 354,
          },
        },
        {
          title: "详细",
          basic: {
            可用余额: "120M GHM",
            委托: "1,386,169,037.96114985 GHM",
            提取奖励: "X GHM",
            解除绑定期: "X GHM",
            佣金: "x GHM",
          },
        },
      ],
      list: [
        {
          transHash: "ldfhjahdfjdfhjfhdfsdffh",
          type: "合约执行",
          block: "111151414",
          timer: "8分钟前",
          adress: "afdfdfdfdfdf",
          targetAdress: "dfajdfdfsfsdhkj",
          transValue: "0 GHM",
          poundage: "0.121414154544",
        },
        {
          transHash: "ldfhjahdfjdfhjfhdfsdffh",
          type: "转账",
          block: "111151414",
          timer: "811分钟前",
          adress: "afdfdfdasfdf",
          targetAdress: "dfajdfdfadsdhkj",
          transValue: "0 GHM",
          poundage: "0.121414154544",
        },
        {
          transHash: "ldfhjahdfjdfhjfhdfsdffh",
          type: "领取奖励",
          block: "111151414",
          timer: "118分钟前",
          adress: "afdfdfdfdfdf",
          targetAdress: "dfajdfadsfsdhkj",
          transValue: "0 GHM",
          poundage: "0.121414154544",
        },
        {
          transHash: "ldfhjahdfjdfhjfhdfsdffh",
          type: "转账",
          block: "111151414",
          timer: "8分钟前",
          adress: "afdfdfdasfdf",
          targetAdress: "dfajdfdfadsfhkj",
          transValue: "0 GHM",
          poundage: "0.121414154544",
        },
        {
          transHash: "ldfhjahdfjdfhjfhdfsdffh",
          type: "委托",
          block: "111151414",
          timer: "18分钟前",
          adress: "afdfdfdasfdf",
          targetAdress: "dfajdfdfadsdhkj",
          transValue: "0 GHM",
          poundage: "0.121414154544",
        },
        {
          transHash: "ldfhjahdfjdfhjfhdfsdffh",
          type: "转账",
          block: "111151414",
          timer: "8分钟前",
          adress: "afdfdfdasfdf",
          targetAdress: "dfajdfdfadsfhkj",
          transValue: "0 GHM",
          poundage: "0.121414154544",
        },
        {
          transHash: "ldfhjahdfjdfhjfhdfsdffh",
          type: "赎回交易",
          block: "111151414",
          timer: "8分钟前",
          adress: "afdfdfdfdfdf",
          targetAdress: "dfajdfdfsfsdhkj",
          transValue: "0 GHM",
          poundage: "0.121414154544",
        },
      ],
    };
  },
  created() {
    this.address = this.$route.query.address;
    this.getAccountMsg(this.$route.query.address);
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
      // console.log('res4',res4);
      // console.log('res5',res5);
      // console.log('res6',res6);
      // console.log('res7',res7);
      // console.log('res8',res8);
      // console.log('res9',res9);
    },
  },
  computed: {
    total() {
      // return '$' + this.reward.amount*1+this.avaliable.amount*1+this.delegated.shares*1
    },
  },
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
  .column {
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
    height: 732px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    &-header {
      height: 60px;
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

    .detail-table{
      width: 100%;
    }
  }
}
</style>
