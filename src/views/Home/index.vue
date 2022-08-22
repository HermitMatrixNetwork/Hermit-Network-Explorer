<template>
  <div class="Home">
    <div id="setting_Image">
      <div class="content">
        <SearchBox></SearchBox>
        <div class="banner"></div>
      </div>
    </div>

    <div class="pageMain">
      <div class="block-message">
        <div v-for="item in messageList" :key="item.title" class="block-item">
          <div class="blockicon">
            <img :src="item.icon" alt="" />
          </div>
          <div class="explain">
            <p>{{ item.title }}</p>
            <h3>${{ item.price }}</h3>
          </div>
        </div>
      </div>

      <div class="newest-data">
        <div class="block-chart">
          <div class="outBlockTime">
            {{ languagePack.LiveBlocktimes }}
            <div class="barChart" />
          </div>
          <div class="outBlockNum">
            {{ languagePack.LiveTranransactions }}
            <div class="barChart" />
          </div>
        </div>

        <div class="newest-data-item">
          <!--当前区块高度-->
          <div @click="checkBlock_Detail">
            <p>{{ languagePack.Liveblockheight }}</p>
            <span>{{ basicData.blockHeight }}</span>
          </div>
          <!--当前出块节点-->
          <div>
            <p>{{ languagePack.Liveblocknodes }}</p>
            <span>{{ basicData.latestNode }}</span>
          </div>

          <!--累计交易笔数-->
          <div @click="toGo('/tsx')">
            <p>{{ languagePack.accumulatedtradingvolume }}</p>
            <span>{{ basicData.detailNum }}</span>
          </div>

          <!--10秒内平均TPS/瞬时最高TPS-->
          <div>
            <p>{{languagePack.AverageTPSWithin10S}}</p>
            <span>{{ basicData.blockHeight }}</span>
          </div>

          <!--流通量-->
          <div class="circulate">
            <p>
              {{ languagePack.CirculatingTotalSupply }}
              <el-tooltip
                class="item"
                effect="dark"
                :content="circulateTooltip"
                placement="top-start"
                popper-class="circulateTooltipStyle"
              >
                <img src="@/assets/img/annotation.png" />
              </el-tooltip>
              /{{ languagePack.Total }}
            </p>
            <span>
              {{ (basicData.circulation / 1e6).toFixed(2) + "M" }}/{{
                (basicData.issueNum / 1e6).toFixed(2) + "M"
              }}
            </span>
            <!-- <el-progress :percentage="circulationAndissueNum" text-inside></el-progress> -->
          </div>

          <!--质押率-->
          <div>
            <p>{{ languagePack.StakingRate }}</p>
            <span>{{ basicData.Pledgerate }}% /{{ basicData.issueNum }}</span>
          </div>

          <!--地址数-->
          <div>
            <p>{{languagePack.LiveAddress}}</p>
            <span>{{ basicData.totalNum }}</span>
          </div>
        </div>
      </div>

      <div class="allblock-number">
        <!--查看所有区块-->
        <div class="newBlock">
          <div class="block-title">{{ languagePack.LiveBlock }}</div>
          <ul class="blockInformation">
            <li class="blockInformation-item" v-for="item in 9" :key="item">
              <img src="@/assets/img/bar.png" alt="" />
              <div class="basic">
                <p>36895421{{ item + 1 }}<span>{{languagePack.proposer}}propoasl</span></p>
                <p>6s {{languagePack.xsecondsago}}</p>
              </div>
              <div class="btnRate">1.86Txns</div>
            </li>
          </ul>
          <div class="bottom">
            <button class="seeAll" @click="toGo('/blockcheck')">
              {{ languagePack.AllBlocks }}
            </button>
          </div>
        </div>

        <!--查看所有验证节点-->
        <div class="topBlock">
          <div class="block-title">{{ languagePack.ElectedValidators }}</div>
          <ul class="nodeInformation">
            <li
              v-for="(item, index) in nodelist"
              :key="item.operator_address"
              class="nodeInformation_item"
            >
              <div class="icon">top{{ index + 1 }}</div>
              <div class="basic">
                <p>{{languagePack.ElectedValidators}}{{ index + 1 }}</p>
                <p>{{languagePack.TotalStakes}}{{ item.tokens }}uGHM</p>
              </div>
              <div class="btnRate">338.45% {{languagePack.ValidatorYield}}</div>
            </li>
          </ul>
          <div class="bottom">
            <button class="seeAll" @click="toGo('/validation')">
              {{ languagePack.AllValidators }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bar } from "@/echarts/index.js";
import * as echarts from "echarts";
import { allValidationNode, getAddressTxs } from "@/api/api.js";
import {
  getLatestBlock,
  allAdresQuantity,
  pledgeParameter,
  totalCirculation,
  querylatestNodeMessage,
} from "@/api/home.js";
import mixin from "@/mixins";
export default {
  mixins: [mixin],
  name: "Home",
  data() {
    return {
      select: "1",
      timer2: "",
      nodelist: "", //当前验证节点列表
      basicData: {
        blockHeight: 0, //当前区块高度
        latestNode: "", //当前出块节点
        detailNum: "", //累计交易笔数
        circulation: "", //流通量
        Pledgerate: "", //质押率
        totalNum: 0,
        issueNum: "",
        pledgeNum: "",
      },
      circulateTooltip: `在市场上实时流通的、公众手中的Token数量。实时
                        流通供应量 = 总发行量 - 锁仓的Token 其中，锁
                        仓的Token为所有锁仓状态的Token，包含当前委托
                        或处于绑定解锁期的锁仓状态的Token。`,
    };
  },
  created() {
    this.getnowBlockHeight();
    // this.timer2 = setInterval(() => this.getnowBlockHeight(), 4000);
    this.getBlockMsg();
  },
  mounted() {
    let charts = document.querySelectorAll(".barChart");
    // charts.forEach((item) => {
    //   bar(echarts.init(item));
    // });
    bar(charts);
  },
  methods: {
    //获取当前区块高度
    async getnowBlockHeight() {
      const res = await getLatestBlock();
      this.basicData.blockHeight = res.block.last_commit.height;
    },
    checkBlock_Detail() {
      this.$router.push({
        path: "block_detail",
        query: { height: this.basicData.blockHeight },
      });
    },
    //获取数据
    async getBlockMsg() {
      const res = await allAdresQuantity(); //总地址数
      const issueNum = await totalCirculation(); //获取总发行量
      const pledgeNum = await pledgeParameter(); //获取质押参数
      const latestNode = await querylatestNodeMessage();
      // const detailNum = await getAddressTxs(`message.module = 'bank'`);  //获取交易信息
      // this.totalNum = res.pagination.total; //总地址数量
      // this.issueNum = issueNum.supply[0].amount;
      // this.pledgeNum = pledgeNum.params.historical_entries; //质押参数
      //  流通量 = 总发行量 -  质押量
      // this.circulation = this.issueNum - this.pledgeNum;

      this.basicData = {
        ...this.basicData,
        totalNum: res.pagination.total, //总地址数量
        issueNum: issueNum.supply[0].amount, //总发行量
        pledgeNum: pledgeNum.params.historical_entries, //质押参数
        circulation:
          issueNum.supply[0].amount - pledgeNum.params.historical_entries, //流通量 = 总发行量 - 质押量
        Pledgerate: (
          pledgeNum.params.historical_entries / issueNum.supply[0].amount
        ).toFixed(2), //质押率
        latestNode: latestNode.default_node_info.moniker, //最新出块节点
        detailNum: 63,
      };
      //质押率
      // this.Pledgerate = (this.pledgeNum / this.issueNum).toFixed(2);

      // console.log('总地址数量',res);
      const nodelist = await allValidationNode();
      this.nodelist = nodelist.validators;
      console.log("节点信息", nodelist);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer2);
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    circulationAndissueNum() {
      return (this.circulation / this.issueNum) * 100;
    },
    messageList() {
      const { Price, transactionVolume } = this.languagePack;
      return [
        {
          title: Price,
          price: "0.48",
          updown: "-5.29",
          icon: require("@/assets/img/home_icon1.png"),
        },
        {
          title: transactionVolume,
          price: "0.48",
          updown: "",
          icon: require("@/assets/img/home_icon2.png"),
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.Home {
  width: 100%;
  background: #ffffff;
}
#setting_Image {
  min-height: 277px;
  background: url("../../assets/img/home_background.png");
  background-size: 100% 100%;
  .content {
    max-width: 1280px;
    height: 277px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .banner {
    width: 300px;
    height: 140px;
    background: #515151;
    border-radius: 8px;
  }
}

.pageMain {
  .block-message {
    width: 1280px;
    height: 128px;
    padding: 37px 0 37px 70px;

    margin: 0 auto;
    transform: translateY(-25%);
    display: flex;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    .block-item {
      width: 50%;
      display: flex;
      align-items: center;
      .blockicon {
        width: 64px;
        height: 64px;
      }
      .explain {
        padding-left: 23px;
        p {
          height: 17px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(20, 37, 62, 0.45);
          letter-spacing: 0;
        }
        h3 {
          height: 29px;
          font-family: DIN-Bold;
          font-weight: Bold;
          font-size: 24px;
          color: rgba(20, 37, 62, 0.85);
          letter-spacing: 0;
        }
      }
    }
  }

  .newest-data {
    height: 350px;
    width: 1280px;
    margin: -16px auto;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    .newest-data-item {
      padding: 0 64px 40px 64px;
      height: 180px;
      display: flex;
      flex-wrap: wrap;

      div {
        height: 44px;
        width: 25%;
        position: relative;

        p {
          height: 17px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(20, 37, 62, 0.45);
          letter-spacing: 0;
          margin-bottom: 8px;
        }
        span {
          height: 19px;
          font-weight: 560;
          font-size: 16px;
          color: rgba(20, 37, 62, 0.85);
          letter-spacing: 0;
          cursor: pointer;
          &:hover {
            color: #1e42ed;
          }
        }
      }
      .circulate {
        > p {
          display: flex;
          align-items: center;
          > img {
            padding: 0 2px;
          }
        }
      }
    }
  }

  .block-chart {
    height: 170px;
    padding: 40px 64px;
    display: flex;
    font-size: 12px;
    color: rgba(20, 37, 62, 0.45);
    div {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
    }
  }

  //区块数、当选验证节点
  .allblock-number {
    width: 1280px;
    margin: 32px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .newBlock,
    .topBlock {
      width: 630px;
      height: 100%;
      position: relative;
      height: 838px;
      border: 1px solid #e9eaef;
      box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
      border-radius: 4px;
      .block-title {
        height: 52px;
        box-shadow: inset 0 -1px 0 0 #e9eaef;
        line-height: 52px;
        font-weight: 500;
        font-size: 14px;
        color: rgba(20, 37, 62, 0.85);
        text-indent: 16px;
        z-index: 9;
        position: absolute;
        top: 0;
        background: #ffffff;
        width: 100%;
      }
      .bottom {
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 999;
        height: 56px;
        background: #ffffff;
        box-shadow: inset 0 1px 0 0 #e9eaef;
        border-radius: 0 0 4px 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .seeAll {
      width: 597px;
      height: 32px;
      background: #edf0ff;
      border-radius: 2px;
      border: none;
      cursor: pointer;
    }
    .topBlock {
      overflow: hidden;
      .nodeInformation {
        height: 720px;
        padding: 0 16px;
        transform: translateY(-100%);
        animation: sliding 5s linear infinite;
        &_item {
          width: 100%;
          height: 40px;
          padding: 16px 0;
          display: flex;
          align-items: center;
          position: relative;
          .icon {
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            background: #f2f3f4;
            font-family: DIN-Bold;
            font-weight: Bold;
            font-size: 12px;
            color: rgba(20, 37, 62, 0.85);
            text-align: center;
          }
        }
      }
      ul:hover {
        animation-play-state: paused;
      }
      li:hover {
        cursor: pointer;
      }
      @keyframes sliding {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0%);
        }
      }
    }
    .newBlock {
      overflow: hidden;
      .blockInformation {
        margin-top: 52px;
        height: 720px;
        &-item {
          height: 73px;
          width: 540px;
          border-bottom: 1px solid #eaebef;
          margin-left: 72px;
          position: relative;
          display: flex;
          align-items: center;
          > img {
            position: absolute;
            top: 50%;
            transform: translate(-120%, -25%);
          }
        }
      }
    }
    .btnRate {
      width: 124px;
      height: 28px;
      background-image: linear-gradient(
        90deg,
        rgba(242, 243, 244, 0) 0%,
        #f2f3f4 35%
      );
      border-radius: 1px 4px 4px 1px 0;
      font-weight: 500;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.45);
      letter-spacing: 0;
      text-align: center;
      line-height: 28px;
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }
    .basic {
      padding-left: 16px;
      font-weight: 400;
      font-size: 12px;
      p:nth-child(1) {
        height: 17px;
        color: #5671f2;
        padding-bottom: 6px;
      }
      p:nth-child(2) {
        height: 17px;
        color: rgba(20, 37, 62, 0.45);
      }
    }
  }
}

.barChart {
  width: 376px;
  height: 44px !important;
  margin-top: 24px;
}

::v-deep .input-with-select {
  .el-input--suffix {
    .el-input__inner {
      width: 130px;
      text-align: center;
      padding: 0;
    }
  }
  .el-input-group__append {
    background: #1e42ec;
    border: none;
    color: #ffffff;
  }
}

@media screen and (max-width: 598px) {
  #setting_Image {
    min-height: 200px;
    .content {
      height: 200px;
    }
  }
  .pageMain {
    margin: 0 10px;

    .block-message {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      transform: translateY(-10%);
      height: auto;
      padding: 0;
      .block-item {
        padding: 16px;
      }
    }

    .newest-data {
      width: 100%;
      height: 420px;
      .block-chart {
        padding: 12px;
        height: 200px;
        flex-direction: column;
        align-items: center;
        div {
          width: 100%;
        }
      }
      &-item {
        padding: 0 12px !important;
        > div {
          width: 50% !important;
          h3 {
            font-size: 12px !important;
          }
        }
      }
    }

    .allblock-number {
      // width: 100%;
      width: 100%;
      flex-direction: column;
      align-items: center;
      height: 1000px;
      > div {
        margin: 0 12px;
        width: 100% !important;
        height: 560px !important;
        overflow: hidden;
      }
      .topBlock {
        .nodeInformation {
          padding: 0 12px !important;
          .btnRate {
            right: 0;
          }
        }
      }
      .seeAll {
        width: 100%;
      }
    }
  }

  #setting_Image {
    // padding-top: 60px;
    .banner {
      display: none;
    }

    .inputVal {
      margin: 0 10px;
      .el-input__inner {
        display: none;
      }
    }
  }
}
.blockHeight {
  cursor: pointer;
}
</style>

<style>
/* 文字提示弹窗样式 */
.circulateTooltipStyle {
  width: 250px;
  height: 100px;
  padding: 7px 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  background: rgba(0, 0, 0, 0.75) !important;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}
</style>
