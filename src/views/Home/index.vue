<template>
  <div class="Home">
    <div id="setting_Image">
      <div class="content">
        <div class="leftContent">
          <div class="bannerPrompt">区块浏览器</div>
          <SearchBox :currentHeight="basicData.blockHeight"></SearchBox>
          <a href="http://www.baidu.com" target="_blank" class="link">活动：此处可插入广告语进行引导 跳转按钮 跳转网页</a>
        </div>
        <div class="banner">
          <a :href="banner.link" target="_blank"><img :src="banner.url" alt=""/></a>
        </div>
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
            <h3>
              {{ item.price
              }}<span
                :style="{ color: item.updown > 0 ? '#f23c24' : '#55C499' }"
                >{{ item.updown }}</span
              >
            </h3>
          </div>
        </div>
      </div>

      <div class="newest-data">
        <div class="block-chart">
          <div class="outBlockTime">
            {{ languagePack.hometext10 }}
            <div
              class="barChart"
              @mouseover="chartsAnimation = false"
              @mouseleave="chartsAnimation = true"
            />
          </div>
          <div class="outBlockNum">
            {{ languagePack.hometext11 }}
            <div
              class="barChart txbarChart"
              @mouseover="chartsAnimation = false"
              @mouseleave="chartsAnimation = true"
            />
          </div>
        </div>

        <div class="newest-data-item">
          <!--当前区块高度-->
          <div class="canClick">
            <p>{{ languagePack.hometext12 }}</p>
            <span @click="queryDealtoBlock(basicData.blockHeight)">{{
              basicData.blockHeight
            }}</span>
          </div>
          <!--当前出块节点-->
          <div class="canClick">
            <p>{{ languagePack.hometext13 }}</p>
            <span @click="queryDealtoNode(basicData.latestNode.address)">{{
              basicData.latestNode.moniker
            }}</span>
          </div>

          <!--累计交易笔数-->
          <div class="canClick">
            <p>{{ languagePack.hometext14 }}</p>
            <span @click="toGo('/tsx')">{{ basicData.detailNum }}</span>
          </div>

          <!--10秒内平均TPS/瞬时最高TPS-->
          <div>
            <p>{{ languagePack.hometext15 }}</p>
            <span>{{ TPS }}</span>
          </div>

          <!--流通量-->
          <div class="circulate progress">
            <p>
              {{ languagePack.hometext16 }}
              <el-tooltip
                class="item"
                effect="dark"
                :content="circulateTooltip"
                placement="top-start"
                popper-class="circulateTooltipStyle"
              >
                <img src="@/assets/img/annotation.png" />
              </el-tooltip>
              /{{ languagePack.hometext29 }}
            </p>
            <span>
              {{ basicData.circulation / 1e6 + "M" }}/{{
                basicData.issueNum / 1e6 + "M"
              }}
            </span>
            <el-progress
              :percentage="
                progressFormat(basicData.circulation, basicData.issueNum)
              "
              :stroke-width="8"
              color="#1E42EDFF"
              :show-text="false"
            ></el-progress>
          </div>

          <!--质押率-->
          <div class="progress">
            <p>{{ languagePack.hometext17 }}</p>
            <span
              >{{ basicData.Pledgerate }}% /{{
                (basicData.issueNum / 1e6).toFixed(2) + "M"
              }}</span
            >
            <el-progress
              :percentage="
                progressFormat(basicData.pledgeNum, basicData.issueNum)
              "
              :stroke-width="8"
              color="#1E42EDFF"
              :show-text="false"
            ></el-progress>
          </div>

          <!--地址数-->
          <div>
            <p>{{ languagePack.hometext18 }}</p>
            <span>{{ basicData.totalNum }}</span>
          </div>
        </div>
      </div>

      <div class="allblock-number">
        <!--查看所有区块-->
        <div class="newBlock">
          <div class="block-title">{{ languagePack.hometext19 }}</div>
          <ul class="blockInformation">
            <li
              class="blockInformation-item"
              v-for="item in blockList"
              :key="item._id"
            >
              <img src="@/assets/img/bar.png" alt="" />
              <div class="basic">
                <p>
                  <span @click="queryDealtoBlock(item._id)">{{
                    item._id
                  }}</span>
                  <span
                    style="color: rgba(20, 37, 62, 0.85); padding-left: 24px"
                    >{{ languagePack.hometext20 }}</span
                  >
                  <span @click="queryDealtoNode(item.validator)">{{
                    item.proposer_address | sliceAddress
                  }}</span>
                </p>
                <p>{{ item.timestamp | jetlag }}</p>
                <!-- <p>{{item.timeStamp}}</p> -->
                <!-- {{ languagePack.xsecondsago }} -->
              </div>
              <div class="btnRate">{{ item.tx_count }} Txns</div>
            </li>
          </ul>
          <div class="bottom">
            <button class="seeAll" @click="toGo('/blockcheck')">
              {{ languagePack.hometext23 }}
            </button>
          </div>
        </div>

        <!--查看所有验证节点-->
        <div class="topBlock">
          <div class="block-title">{{ languagePack.hometext24 }}</div>
          <!-- <div></div> -->
          <ul
            :class="[
              'nodeInformation',
              nodelist.length >= 10 ? 'animation_Node' : '',
            ]"
            v-for="i in 2"
            :key="i"
          >
            <li
              v-for="(item, index) in nodelist"
              :key="index"
              class="nodeInformation_item"
              @click="queryDealtoNode(item.operator_address)"
            >
              <div class="icon">Top{{ index + 1 }}</div>
              <div class="basic">
                <p>{{ languagePack.hometext24 }}{{ index + 1 }}</p>
                <p>{{ languagePack.hometext25 }}{{ item.tokens / 1e6 }} GHM</p>
              </div>
              <div class="btnRate">
                {{ item.commission.commission_rates.rate * 100 }}%
                {{ languagePack.hometext26 }}
              </div>
            </li>
          </ul>
          <div class="bottom">
            <button class="seeAll" @click="toGo('/validation')">
              {{ languagePack.hometext28 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { blockBar } from "@/echarts/index.js";
import * as echarts from "echarts";
import { allValidationNode } from "@/api/api.js";
import {
  getLatestBlock,
  allAdresQuantity,
  pledgeParameter,
  totalCirculation,
  querylatestNodeMessage,
  pledgeTotal,
  getbanner,
} from "@/api/home.js";
import { queryBlockList, queryTxList } from "@/api/blockchain.js";
import mixin from "@/mixins";
import { mapState } from "vuex";

export default {
  mixins: [mixin],
  name: "Home",
  data() {
    return {
      select: "1",
      timer: "",
      time2: "",
      TPS: "",
      lastUpdate: 0,
      percenTage: 0,
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
      blockList: [],
      banner: {},
      chartsAnimation: true,
    };
  },
  async created() {
    this.basicData.blockHeight = await this.getnowBlockHeight();
    this.getBlockMsg();
    this.getnowBlockList();
    let {
      data: {
        banner: {
          photos: { photos },
        },
      },
    } = await getbanner();
    this.banner = photos[0];
  },
  mounted() {
    this.charts = {
      block: echarts.init(document.querySelector(".barChart")),
      txcharts: echarts.init(document.querySelector(".txbarChart")),
    };
  },
  methods: {
    //获取当前区块高度
    async getnowBlockHeight() {
      const res = await getLatestBlock();
      return res.block.last_commit.height;
    },
    //获取数据
    async getBlockMsg() {
      const res = await allAdresQuantity(); //总地址数
      const { supply } = await totalCirculation(); //获取总发行量
      const {
        pool: { bonded_tokens },
      } = await pledgeTotal(); //获取质押参数
      const { validators } = await allValidationNode();
      // console.log("节点", await querylatestNodeMessage());
      const {
        data: { total },
      } = await queryTxList(10, 1); //获取交易数量
      let newValidatoes = validators.reverse();
      this.basicData = {
        ...this.basicData,
        totalNum: res.pagination.total, //总地址数量
        issueNum: supply[0].amount, //总发行量
        pledgeNum: bonded_tokens, //质押参数
        circulation: supply[0].amount - bonded_tokens, //流通量 = 总发行量 - 质押量
        Pledgerate: ((bonded_tokens / supply[0].amount) * 100).toFixed(2), //质押率
        latestNode: {
          moniker: newValidatoes[0].description.moniker,
          address: newValidatoes[0].operator_address,
        }, //最新出块节点
        detailNum: total,
      };

      this.nodelist = newValidatoes;
    },
    //实时出块区块
    async getnowBlockList() {
      const {
        data: { list },
      } = await queryBlockList(20, 0);
      // console.log("最新的出块区块", list);
      this.blockList = list;
      let echartList = list.map((e) => {
        return { height: e._id, timestamp: e.timestamp, tx: e.tx_count };
      });
      if (this.chartsAnimation) {
        // console.log('调用出块动画');
        blockBar(this.charts, echartList);
      }
    },

    progressFormat(a, b) {
      let result = ((Number(a) / Number(b)) * 100).toFixed(2);
      if (!isNaN(result)) {
        return Number(result);
      } else {
        return 1;
      }
    },

    async updateNode() {
      const { validators } = await allValidationNode();
      const {
        data: { total },
      } = await queryTxList(10, 1); //获取交易数量
      let newValidators = validators.reverse();
      this.basicData.detailNum = total;
      this.basicData.latestNode = {
        moniker: newValidators[0].description.moniker,
        address: newValidators[0].operator_address,
      };
      this.nodelist = newValidators;
    },
  },
  activated() {
    this.timer = setInterval(() => {
      this.lastUpdate++;
    }, 1000);
    this.time2 = setInterval(() => {
      this.getBlockMsg();
    }, 10000);
  },
  deactivated() {
    clearInterval(this.timer);
    clearInterval(this.time2);
  },
  computed: {
    ...mapState({
      languagePack: (state) => state.Language,
      tokenPrice: (state) => state.tokenPrice,
    }),
    messageList() {
      const { hometext08, hometext09 } = this.languagePack;
      return [
        {
          title: hometext08,
          price: this.tokenPrice,
          updown: "",
          icon: require("@/assets/img/home_icon1.png"),
        },
        {
          title: hometext09,
          price: "0.00",
          updown: "",
          icon: require("@/assets/img/home_icon2.png"),
        },
      ];
    },
  },
  watch: {
    blockList(value) {
      let num1 = value[0].tx_count;
      let num2 = value[1].tx_count;
      this.TPS = num1 + num2 + " / " + (num1 > num2 ? num1 : num2);
    },
    async lastUpdate(value) {
      if (value % 3 === 0) {
        const number = await this.getnowBlockHeight();
        /* 判断是否出块，有出块就更新列表，重新渲染图表 */
        if (number !== this.basicData.blockHeight) {
          this.lastUpdate = 0;
          this.basicData.blockHeight = number;
          this.getnowBlockList();
        }
      }
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
    min-width: 1000px;
    height: 277px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bannerPrompt {
      height: 28px;
      font-weight: 600;
      font-size: 20px;
      color: #ffffff;
      margin-bottom: 16px;
    }
    .link {
      height: 17px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.85);
      margin-top: 16px;
      display: block;
      cursor: pointer;
    }
  }
  .banner {
    width: 300px;
    height: 140px;
    background: #515151;
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 140px;
      cursor: pointer;
    }
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
          white-space: nowrap;
        }
        h3 {
          height: 29px;
          font-family: DIN-Bold;
          font-weight: Bold;
          font-size: 24px;
          color: rgba(20, 37, 62, 0.85);
          white-space: nowrap;
          > span {
            height: 22px;
            font-family: PingFangSC-Regular;
            color: #55c499;
            font-size: 16px;
            font-weight: 400;
            padding-left: 6px;
          }
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
      .canClick {
        > span {
          cursor: pointer;
        }
      }
      div {
        height: 44px;
        width: 25%;
        position: relative;
        white-space: nowrap;
        &:nth-child(4) {
          > span {
            color: #1e42ed;
          }
        }

        > p {
          height: 17px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(20, 37, 62, 0.45);
          letter-spacing: 0;
          margin-bottom: 8px;
        }
        > span {
          height: 19px;
          font-weight: bold;
          font-size: 16px;
          color: rgba(20, 37, 62, 0.85);
          letter-spacing: 0;
          transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
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
        font-weight: bold;
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
        z-index: 9;
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
      color: #1e42ed;
      cursor: pointer;
    }
    .topBlock {
      overflow: hidden;
      &:hover {
        > ul {
          animation-play-state: paused;
        }
      }
      .animation_Node {
        animation: sliding 10s linear infinite;
        padding-top: 0 !important ;
      }
      .nodeInformation {
        padding: 52px 16px 0;
        transform: translateY(-100%);
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
            font-weight: Bold;
            font-size: 12px;
            color: rgba(20, 37, 62, 0.85);
            text-align: center;
          }
        }
      }

      li:hover {
        cursor: pointer;
      }
      @keyframes sliding {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0);
        }
      }
    }
    .newBlock {
      overflow: hidden;
      .blockInformation {
        margin-top: 52px;
        height: 720px;
        &-item {
          height: 72px;
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
      height: 28px;
      background-image: linear-gradient(
        90deg,
        rgba(242, 243, 244, 0) 0%,
        #f2f3f4 35%
      );
      border-radius: 1px 4px 4px 1px 0;
      font-weight: bold;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.45);
      letter-spacing: 0;
      text-align: center;
      line-height: 28px;
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 8px 0 24px;
    }
    .basic {
      padding-left: 16px;
      font-weight: 400;
      font-size: 12px;
      p:nth-child(1) {
        height: 17px;
        color: #5671f2;
        padding-bottom: 6px;
        > span:not(:nth-child(2)) {
          cursor: pointer;
        }
      }
      p:nth-child(2) {
        height: 17px;
        color: rgba(20, 37, 62, 0.45);
      }
    }
  }
  margin-bottom: 80px;
}

.barChart {
  width: 376px;
  height: 44px !important;
  margin-top: 24px;
}

@media screen and (max-width: 598px) {
  #setting_Image {
    min-height: 200px;
    .content {
      height: 200px;
      min-width: 100% !important;
    }
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
        padding: 0px 12px !important;
        > div {
          width: 50% !important;
          h3 {
            font-size: 12px !important;
          }
          &:nth-child(6) {
            transform: translate(-25%, 100%);
            > span {
              white-space: nowrap;
            }
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
          padding: 52px 12px 0;
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
}
.blockHeight {
  cursor: pointer;
}
::v-deep .el-progress {
  .el-progress-bar {
    width: 200px !important;
    margin-top: 6px;
  }
}
.progress {
  height: 60px !important;
}
</style>
