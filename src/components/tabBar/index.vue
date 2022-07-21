<template>
  <div class="tabBar">
    <!-- <div> -->
      <img src="../../assets/img/top-bar_logo.png" class="logo_style" />
    <!-- </div> -->
    <div class="headernav">
      <div class="navs">
        <router-link to="home">{{ languagePack.home }}</router-link>
        <a @click="toblock">{{ languagePack.Blockchain }}</a>
        <a>{{ languagePack.contract }}</a>
        <a>{{ languagePack.account }}</a>
        <router-link to="contracts">{{ languagePack.Validationnode }}</router-link>
        <a>{{ languagePack.resources }}</a>
        <a>{{ languagePack.more }}</a>
      </div>
      <div class="langage hidden-sm-and-down">
        <select v-model="lang" @change="LanguageChange">
          <option value="0">简体中文</option>
          <option value="1">English</option>
        </select>
      </div>
    </div>

    <!-- <el-button @click="drawer = true" type="primary" style="margin-left: 16">
      <img
        src="https://scan.platon.network/static/images/icon_menu.svg"
        alt=""
      />
    </el-button> -->
    <div>
      <!-- <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="210"
    >
      <div class="popTitle">
        <p>{{ languagePack.text01 }}</p>
        <p @click="toblock">{{ languagePack.text02 }}</p>
        <p>{{ languagePack.text01 }}</p>
        <p>{{ languagePack.text01 }}</p>
        <p>{{ languagePack.text01 }}</p>
        <p @click="sss">中文简体/English</p>
      </div>
    </el-drawer> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "",
      drawer: false,
      Logo: "",
    };
  },
  created() {
    this.lang = localStorage.getItem("language") || 1;
  },
  mounted() {},
  methods: {
    LanguageChange() {
      localStorage.setItem("language", this.lang);
      // 调用mutation中的方法，通过本地存储切换语言
      this.$store.commit("CHANGE_LANGUAGE");
    },
    toblock() {
      this.$router.push("blockchain");
    },
    sss() {
      this.lang == 1 ? (this.lang = 0) : (this.lang = 1);
      this.LanguageChange();
      this.drawer = !this.drawer;
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
  },
};
</script>
<style lang="scss" scoped>
.tabBar {
  background: #ffffff;
  height: 60px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.headernav{
    width: 740px;
    height: 60px;
    display: flex;
    line-height: 60px;
    align-items: center;
    justify-content: space-between;
}
.navs {
  display: flex;
  width: 526px;
  justify-content: space-around;
  a {
    display: block;
    height: 60px;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
  }
}

.logo_style {
  width: 255px;
  height: 36px;
}

@media screen and (max-width: 598px) {
  .tabBar {
    // position: fixed;
    // // z-index: 999;
  }
}
</style>
