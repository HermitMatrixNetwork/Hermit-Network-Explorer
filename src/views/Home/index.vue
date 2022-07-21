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
          <div>
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
            <p>{{ languagePack.text19 }}</p>
            <h3>{{ blockHeight }}</h3>
          </div>

           <!--质押率-->
          <div>
            <p>{{ languagePack.text19 }}</p>
            <h3>{{ blockHeight }}</h3>
          </div>

           <!--地址数-->
          <div>
            <p>{{ languagePack.text19 }}</p>
            <h3>{{ blockHeight }}</h3>
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
          {{ languagePack.text15 }}
          <ul>
            <li v-for="item in 20" :key="item">
              {{ item }}
            </li>
          </ul>
          <button class="seeAll">{{ languagePack.text17 }}</button>
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
      messageList: [
        {
          title: "GHM价格",
          price: "0.48",
          updown: "-5.29",
          icon: "",
        },
        {
          title: "交易额",
          price: "",
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
    block_detail() {
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
    //获取总地址数量
    async getBlockMsg() {
      const res = await allAdresQuantity();
      const issueNum = await totalCirculation();
      const pledgeNum = await pledgeParameter();
      this.totalNum = res.pagination.total;
      this.issueNum = issueNum.supply[0].amount;
      this.outNode = issueNum.supply[0].denom;
      this.pledgeNum = pledgeNum.params.historical_entries;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer2);
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
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
    height: 600px;
    display: flex;
    align-items: center;

    div {
      // flex: 1;
      width: 50%;
      height: 100%;
      text-align: center;
      background: #999;
    }
    .seeAll {
      width: 400px;
      height: 60px;
      background: #000;
      color: #fff;
    }
    .topBlock {
      overflow: hidden;
      ul {
        margin: 0 20px;
        height: 530px;
        transform: translateY(-100%);
        animation: sliding 5s linear infinite;
        li {
          width: 100%;
          height: 60px;
          background: #000;
          color: #fff;
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
  .el-input-group__append{
    background: #1E42EC;
    border: none;
    color: #FFFFFF;
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
