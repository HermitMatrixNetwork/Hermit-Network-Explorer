<template>
  <footer class="bottom">
    <div class="contact">
      <div class="bottom_logo">
        <img src="../../assets/img/bottom-bar_logo.png" alt="" width="28" class="bottomLogo"/>
        <!-- <img src="@/assets/img/bottom-bar_logo@2x.png" alt="" width="48" class="bottomLogoM"> -->
        <p>Powered by Hermit Matrix Network</p>
      </div>

      <div class="contact_ways">
        <div class="qrcode">
          <p>微信公众号</p>
          <img src="../../assets/img/bottom-bar_qrcode.png" alt="" />
        </div>
        <span>
          <img src="../../assets/img/bottom-bar_telegram.png" alt="" />
          <p>Telegram</p>
        </span>
        <span>
          <img src="../../assets/img/bottom-bar_twitter.png" alt="" />
          <p>twitter</p>
        </span>
        <span>
          <img src="../../assets/img/bottom-bar_medium.png" alt="" />
          <p>Medium</p>
        </span>

        <span>
          <img src="../../assets/img/bottom-bar_github.png" alt="" />
          <p>GitHub</p>
        </span>

        <span>
          <img src="../../assets/img/bottom-bar_gitbook.png" alt="" />
          <p>Gitbook</p>
        </span>
      </div>
    </div>
    <div class="record">Hermit Matrix Network © 2022 (HGM)</div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 211px;
  background: url("../../assets/img/bottom-bar_background.png");
  background-size: 100% 100%;

  .contact {
    width: 1280px;
    margin: 0 auto;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom:1px solid #FFFFFF20 ;
    .bottom_logo {
      display: flex;
      align-items: center;
      height: 28px;
      font-weight: 500;
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 0;
      >img{
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
        font-weight: 400;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0;
        img {
          padding-top: 8px;
          width: 80px;
        }
      }
      img {
        padding: 0 20px;
        width: 32px;
        cursor: pointer;
      }
      > span {
        text-align: center;
        font-weight: 400;
        font-size: 12px;
        color: #ffffff;
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
    font-weight: 400;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0;
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
    .bottom_logo{
      flex-direction: column;
      height: 100px !important;
      justify-content: space-between;
      .bottomLogo{
        display: none !important;
      }
      >img{
        width: 36px;
      }
      >p{
        font-size: 16px;
      }
    }
    .contact_ways{
      width: 100% !important;
      justify-content: center !important;
      .qrcode{
        display: none !important;
      }
    }
  }
}
</style>
