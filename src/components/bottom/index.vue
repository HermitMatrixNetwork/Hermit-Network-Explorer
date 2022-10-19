<template>
  <footer class="bottom">
    <div class="contact">
      <div class="bottom_logo">
        <img
          src="../../assets/img/bottom-bar_logo@2x.png"
          alt=""
          width="28"
          class="bottomLogo"
        />
        <!-- <img src="@/assets/img/bottom-bar_logo@2x@2x.png" alt="" width="48" class="bottomLogoM"> -->
        <p>Powered by Hermit Matrix Network</p>
      </div>

      <div class="contact_ways">
        <!-- <div class="qrcode">
          <p>微信公众号</p>
          <img src="../../assets/img/bottom-bar_qrcode@2x.png" alt="" />
        </div> -->
        <div
          class="contact_ways_item"
          v-for="item in contacts"
          :key="item.label"
          @click="jump(item.url)"
        >
          <img :src="item.icon" alt="" />
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>
    <div class="record">Hermit Matrix Network © 2022 (GHM)</div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        {
          label: "Telegram",
          icon: require("@/assets/img/bottom-bar_telegram@2x.png"),
          // url:'https://t.me/G_Hermit'
          url:"https://outlook.live.com/owa/"
        },
        {
          label: "Twitter ",
          icon: require("@/assets/img/bottom-bar_twitter@2x.png"),
          url:' https://twitter.com/ghmhermit?s=09'
        },
        {
          label: "Medium ",
          icon: require("@/assets/img/bottom-bar_medium@2x.png"),
          // url:'https://medium.com/@ghermit'
          url:'https://outlook.live.com/owa/'
        },
        {
          label: "GitHub",
          icon: require("@/assets/img/bottom-bar_github@2x.png"),
          url:'https://github.com/ghermit'
        },
        {
          label: "Gitbook",
          icon: require("@/assets/img/bottom-bar_gitbook@2x.png"),
          url:''
        },
      ],
    };
  },
  methods:{
    jump(url){
      window.open(url)
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom {
  position: relative;
  width: 100%;
  height: 210px;
  background: url("../../assets/img/bottom-bar_background@2x.png");
  background-size: 100% 100%;

  .contact {
    width: 1280px;
    margin: 0 auto;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ffffff20;
    .bottom_logo {
      display: flex;
      align-items: center;
      height: 28px;
      font-weight: bold;
      font-size: 20px;
      color: #ffffff;
      > img {
        padding: 0 10px;
      }
    }

    .contact_ways {
      display: flex;
      align-items: center;
      width: 640px;
      height: 100%;
      justify-content: flex-end;
      .qrcode {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        img {
          padding-top: 8px;
          width: 80px;
        }
        margin-right: 40px;
      }
      &_item {
        cursor: pointer;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        width: 56px;
        margin: 0 10px;
        height: 60px;
        > img {
          width: 32px;
          margin-bottom: 5px;
        }

      }
    }
  }

  .record {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
  }
}

@media screen and (max-width: 598px) {
  .bottom {
    height: 360px;
    background-size: 100% 100%;
  }
  .contact {
    position: relative;
    top: 60px;
    width: 100% !important;
    height: 240px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bottom_logo {
      flex-direction: column;
      height: 100px !important;
      justify-content: space-between;
      .bottomLogo {
        display: none !important;
      }
      > img {
        width: 36px;
      }
      > p {
        font-size: 16px;
      }
    }
    .contact_ways {
      width: 100% !important;
      justify-content: center !important;
      .qrcode {
        display: none !important;
      }
    }
  }
}
</style>
