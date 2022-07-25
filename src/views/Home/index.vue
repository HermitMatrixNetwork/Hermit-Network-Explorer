<template>
  <div class="Home">
    <div class="setting_Image">
      <div class="content">
        <div class="inputVal">
          <el-input
            :placeholder="languagePack.text06"
            v-model="input3"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend">
              <el-option :label="languagePack.text07" value="1"></el-option>
              <el-option :label="languagePack.text08" value="2"></el-option>
              <el-option :label="languagePack.text09" value="3"></el-option>
              <el-option :label="languagePack.text10" value="4"></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchBtn"
            ></el-button>
          </el-input>
        </div>
        <div class="banner"></div>
      </div>
    </div>

    <div class="pageMain">
      <div class="block-message">
        <div v-for="item in messageList" :key="item.title" class="block-item">
          <div class="blockicon"></div>
          <div class="explain">
            <p>{{ item.title }}</p>
            <h3>${{ item.price }}</h3>
          </div>
        </div>
      </div>

      <div class="newest-data">
        <div class="block-chart">
          <div class="outBlockTime">
            {{ languagePack.text12 }}
          </div>
          <div class="outBlockNum">
            {{ languagePack.text13 }}
          </div>
        </div>

        <div class="newest-data-item">
          <!--当前区块高度-->
          <div @click="checkBlock_Detail">
            <p>{{ languagePack.text19 }}</p>
            <h3>{{ blockHeight }}</h3>
          </div>
          <!--当前出块节点-->
          <div>
            <p>{{ languagePack.text15 }}</p>
            <h3>{{ outNode }}</h3>
          </div>

          <!--累计交易笔数-->
          <div>
            <p>{{ languagePack.text20 }}</p>
            <h3>{{ totalNum }}</h3>
          </div>

          <!--10秒内平均TPS/瞬时最高TPS-->
          <div>
            <p>{{ languagePack.text19 }}</p>
            <h3>{{ blockHeight }}</h3>
          </div>

          <!--流通量-->
          <div>
            <p>{{ languagePack.Incirculation }}</p>
            <h3>
              {{ (circulation / 1e6).toFixed(2) + "M" }}/{{
                (issueNum / 1e6).toFixed(2) + "M"
              }}
            </h3>
            <!-- <el-progress :percentage="circulationAndissueNum" text-inside></el-progress> -->
          </div>

          <!--质押率-->
          <div>
            <p>{{ languagePack.Pledgerate }}</p>
            <h3>{{ Pledgerate }}% /{{ issueNum }}</h3>
          </div>

          <!--地址数-->
          <div>
            <p>{{ languagePack.text19 }}</p>
            <h3>{{ totalNum }}</h3>
          </div>
        </div>
      </div>

      <div class="allblock-number">
        <div class="newBlock">
          <h3>{{ languagePack.text14 }}</h3>
          <!-- <Table></Table> -->
          <button class="seeAll">{{ languagePack.text16 }}</button>
        </div>
        <div class="topBlock">
          <div class="nodeTitle">{{ languagePack.text15 }}</div>
          <ul class="nodeInformation">
            <li
              v-for="(item, index) in nodelist"
              :key="item.operator_address"
              class="nodeInformation_item"
            >
              <div class="icon">Top{{ index + 1 }}</div>
              <div class="basic">
                <p>当前验证节点{{ index + 1 }}</p>
                <p>总质押{{ item.tokens }}uGHM</p>
              </div>
              <div class="btnRate">338.45% 佣金率</div>
            </li>
          </ul>
          <div class="bottom">
            <button class="seeAll">{{ languagePack.text17 }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bar, line } from "@/echarts/index.js";
import { Wallet } from "secretjs";
import Table from "@/components/Table/index.vue";
import {
  getLatestBlock,
  allAdresQuantity,
  pledgeParameter,
  totalCirculation,
  allValidationNode,
} from "@/api/api.js";
export default {
  name: "Home",
  components: { Table },
  data() {
    return {
      input3: "",
      select: "1",
      screenWidth: document.body.clientWidth, // 屏幕宽度
      timer: false,
      aa: "",
      blockHeight: 0,
      timer2: "",
      totalNum: 0,
      issueNum: "",
      pledgeNum: "",
      outNode: "",
      circulation: "", //流通量
      Pledgerate: "", //质押率
      nodelist: "", //当前验证节点
      messageList: [
        {
          title: "GHM价格",
          price: "0.48",
          updown: "-5.29",
          icon: "",
        },
        {
          title: "交易额",
          price: "0.48",
          updown: "",
          icon: "",
        },
      ],
    };
  },
  created() {
    // console.log(Wallet);
    this.getnowBlockHeight();
    this.timer2 = setInterval(() => this.getnowBlockHeight(), 4000);
    this.getBlockMsg();
    console.log(this.languagePack);
  },
  mounted() {
    // line(".blockRight");
    // this.aa = document.querySelector(".outBlockTime");
    // bar(document.querySelector(".outBlockTime"), {
    //   title: this.$store.state.Language.text12,
    // });
    // window.onresize = () => {
    //   return (() => {
    //     this.screenWidth = document.body.clientWidth;
    //   })();
    // };
  },
  methods: {
    //获取当前区块高度
    async getnowBlockHeight() {
      const res = await getLatestBlock();
      this.blockHeight = res.block.last_commit.height;
    },
    checkBlock_Detail() {
      this.$router.push({
        path: "block_detail",
        query: { height: this.blockHeight },
      });
    },
    searchBtn() {
      if (!this.input3.trim()) {
        alert("输入不能为空");
        this.input3 = "";
        return;
      }
      switch (this.select * 1) {
        case 1:
          console.log("通过hash搜索");
          break;
        case 2:
          console.log("通过块搜索");
          break;
        case 3:
          console.log("通过地址搜索");
          break;
        case 4:
          console.log("通过token搜索");
          break;
        default:
          break;
      }
    },
    //获取数据
    async getBlockMsg() {
      const res = await allAdresQuantity(); //总地址数
      const issueNum = await totalCirculation(); //获取总发行量
      const pledgeNum = await pledgeParameter(); //获取质押参数
      this.totalNum = res.pagination.total; //总地址数量
      this.issueNum = issueNum.supply[0].amount;
      this.outNode = issueNum.supply[0].denom; //出块节点
      this.pledgeNum = pledgeNum.params.historical_entries; //质押参数
      //  流通量 = 总发行量 -  质押量
      this.circulation = this.issueNum - this.pledgeNum;
      console.log(
        "流通量",
        this.circulation,
        "总发行量",
        this.issueNum,
        "质押量",
        this.pledgeNum
      );
      //质押率
      this.Pledgerate = (this.pledgeNum / this.issueNum).toFixed(2);

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
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          bar(that.aa, { title: that.$store.state.Language.text12 });
          // that.getECharts()  // 操作
          // console.log(val);
          that.timer = false;
        }, 500);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Home {
  width: 100%;
  height: 100%;
}

.setting_Image {
  min-height: 277px;
  background: url("../../assets/img/home_background.png");
  background-size: 100% 100%;

  .content {
    width: 1280px;
    height: 277px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .inputVal {
    width: 768px;
  }

  .banner {
    text-align: center;
    width: 300px;
    height: 140px;
    background: #515151;
    border-radius: 8px;
  }
}

.pageMain {
  //   margin: 0 auto;

  .block-message {
    width: 1280px;
    height: 128px;
    margin: 0 auto;
    transform: translateY(-25%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    .block-item {
      width: 50%;
      height: 54px;
      padding: 37px 0 37px 70px;
      display: flex;
      align-items: center;
      .blockicon {
        width: 64px;
        height: 64px;
        background: url("../../assets/img/home_icon1.png");
        background-size: 100% 100%;
      }
      .explain {
        padding-left: 23px;
        p {
          height: 17px;
          font-family: PingFangSC-Regular;
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
      &:nth-child(2) {
        .blockicon {
          background: url("../../assets/img/home_icon2.png");
          background-size: 100% 100%;
        }
      }
    }
  }

  .newest-data {
    height: 350px;
    width: 1280px;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    .newest-data-item {
      padding: 0 64px 40px 64px;
      height: 140px;
      display: flex;
      flex-wrap: wrap;

      div {
        height: 44px;
        width: 25%;
        position: relative;

        p {
          height: 17px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 12px;
          color: rgba(20, 37, 62, 0.45);
          letter-spacing: 0;
          margin-bottom: 8px;
        }
        h3 {
          height: 19px;
          font-family: DIN-Medium;
          font-weight: 500;
          font-size: 16px;
          color: rgba(20, 37, 62, 0.85);
          letter-spacing: 0;
        }
      }
    }
  }

  //实时区块图标
  .block-chart {
    height: 90px;
    padding: 40px 64px;
    display: flex;
    align-items: center;

    div {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
    }
  }

  //区块数、当选验证节点
  .allblock-number {
    width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .newBlock,
    .topBlock {
      // flex: 1;
      width: 630px;
      height: 100%;
      background: #ffffff;
      position: relative;

      height: 838px;
      background: #ffffff;
      border: 1px solid #e9eaef;
      box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
      border-radius: 4px;
    }
    .seeAll {
      width: 597px;
      height: 32px;
      background: #edf0ff;
      border-radius: 2px;
      border: none;
    }
    .topBlock {
      overflow: hidden;
      .nodeTitle {
        height: 52px;
        box-shadow: inset 0 -1px 0 0 #e9eaef;
        line-height: 52px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 14px;
        color: rgba(20, 37, 62, 0.85);
        letter-spacing: 0;
        text-indent: 16px;
        z-index: 9;
        position: absolute;
        top: 0;
        background: #ffffff;
        width: 100%;
      }
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
            letter-spacing: 0;
            text-align: center;
          }
          .basic {
            // display: flex;
            // flex-direction: column;
            // justify-content: space-between;
            padding-left: 16px;
            font-family: PingFangSC-Regular;
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
          .btnRate {
            width: 124px;
            height: 28px;
            background-image: linear-gradient(
              90deg,
              rgba(242, 243, 244, 0) 0%,
              #f2f3f4 35%
            );
            border-radius: 1px 4px 4px 1px 0;
            font-family: PingFangSC-Medium;
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
        }
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
  }
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

@media screen and(min-width: 569px) and (max-width: 756px) {
  .setting_Image {
    .banner {
      display: none;
    }
  }

  .block-message {
    height: 400px;
    flex-direction: column;

    .blockLeft {
      width: 100%;
    }

    .blockRight {
      width: 100%;
    }
  }

  .block-chart {
    height: 600px;

    flex-direction: column;
    align-items: center;

    div {
      width: 100%;
    }
  }

  .allblock-number {
    flex-direction: column;
    align-items: center;

    div {
      width: 100%;
    }
  }
}

@media screen and (max-width: 598px) {
  .pageMain {
    margin: 0 20px;

    .block-message {
      height: 600px;
      flex-direction: column;
      align-items: center;
      transform: translateY(-10%);
      .blockLeft {
        width: 100%;
        flex-direction: column;
        flex-wrap: nowrap;

        div {
          width: 100%;
        }
      }

      .blockRight {
        width: 100%;
      }
    }

    .block-chart {
      height: 600px;
      flex-direction: column;
      align-items: center;

      div {
        width: 100%;
      }
    }

    .allblock-number {
      flex-direction: column;
      align-items: center;
      height: 1200px;
      div {
        width: 100%;
        flex: 600px;
        overflow: hidden;
      }
      .seeAll {
        width: 100%;
      }
    }
  }

  .setting_Image {
    // padding-top: 60px;
    .banner {
      display: none;
    }

    .inputVal {
      margin: 0 20px;
    }
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.blockHeight {
  cursor: pointer;
}
</style>
