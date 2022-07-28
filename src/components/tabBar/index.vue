<template>
  <div class="tabBar">
    <div class="centerStyle">
      <img src="../../assets/img/top-bar_logo.png" class="logo_style" />
      <div class="headernav">
        <div class="navs">
          <router-link to="home">{{ languagePack.home }}</router-link>
          <el-dropdown @command="blockCommand">
            <span class="el-dropdown-link">
              {{ languagePack.Blockchain
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/blockchain"
                >顶级账户</el-dropdown-item
              >
              <el-dropdown-item divided command="/tsx"
                >查看Txns</el-dropdown-item
              >
              <el-dropdown-item command="/blockcheck"
                >查看区块</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <a @click="toGo('/contracts')">{{ languagePack.contract }}</a>
          <a @click="toGo('/accounts')">{{ languagePack.account }}</a>
          <a @click="toGo('/validation')">{{ languagePack.Validationnode }}</a>
          <el-dropdown  @command="blockCommand">
            <span class="el-dropdown-link">
              {{ languagePack.resources
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>白皮书</el-dropdown-item>
              <el-dropdown-item divided command="/developapi">开发者API</el-dropdown-item>
              <el-dropdown-item>SDK下载</el-dropdown-item>
              <el-dropdown-item>Tendermint</el-dropdown-item>
              <el-dropdown-item>IBC</el-dropdown-item>
              <el-dropdown-item>合约编译器</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="blockCommand">
            <span class="el-dropdown-link">
              {{ languagePack.more
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/govern">DAO可治理参数</el-dropdown-item>
              <el-dropdown-item command="/foundation" divided
                >DAO基金会地址</el-dropdown-item
              >
              <el-dropdown-item command="/c">提交代币LOGO</el-dropdown-item>
              <el-dropdown-item command="/currency_state"
                >提交上币申请</el-dropdown-item
              >
              <el-dropdown-item command="/e">RPC信息</el-dropdown-item>
              <el-dropdown-item command="/f">水龙头</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  </div>
</template>

<script>
import router from "@/router";

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
    toGo(url) {
      //页面跳转
      this.$router.push(url);
    },
    blockCommand(command) {
      console.log(command);
      this.$router.push(command);
    },
    // moreCommand(command){
    //   this.$router.push(command);
    // }
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
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  color: rgba(20, 37, 62, 0.45);
  letter-spacing: 0;
  box-shadow: inset 0 -1px 0 0 #e9eaef;
}
.centerStyle{
  width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.headernav {
  // width: 768px;
  height: 60px;
  display: flex;
  line-height: 60px;
  align-items: center;
  justify-content: space-between;
}
.navs {
  display: flex;
  width: 740px;
  font-size: 14px;
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
  // .tabBar {
  //   // position: fixed;
  //   // // z-index: 999;
  // }
}
</style>
