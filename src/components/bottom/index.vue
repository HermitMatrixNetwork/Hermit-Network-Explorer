<template>
  <footer class="bottom">
    <div class="contact">
      <div class="bottom_logo">
        <img src="../../assets/img/bottom-bar_logo.png" alt="" width="28" />
        <p>Powered by Hermit Matrix Network</p>
      </div>

      <div class="contact_ways">
        <div class="qrcode">
          <p>微信公众号</p>
          <img src="../../assets/img/bottom-bar_qrcode.png" alt="" />
        </div>
        <span>
            <img src="../../assets/img/bottom-bar_telegram.png" alt="" />
            <p>1111</p>
        </span>
        <img src="../../assets/img/bottom-bar_twitter.png" alt="" />
        <img src="../../assets/img/bottom-bar_medium.png" alt="" />
        <img src="../../assets/img/bottom-bar_github.png" alt="" />
        <img src="../../assets/img/bottom-bar_gitbook.png" alt="" />
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
    .bottom_logo {
      display: flex;
      align-items: center;
      height: 28px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 0;
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
            padding-top:8px ;
          width: 80px;
        }
      }
      img {
        padding: 0 20px;
        width: 32px;
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
</style>
