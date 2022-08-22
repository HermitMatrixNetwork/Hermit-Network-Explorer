<template>
  <div class="tabBar">
    <div
      class="centerStyle"
      :style="{ height: $route.path == '/home' ? '60px' : '110px' }"
    >
      <img
        src="img/top-bar_logo.png"
        class="logo_style"
        @click="toGo('/home')"
      />
      <!--移动端显示-->
      <div class="memu" style="display: none">
        <i class="el-icon-s-fold" @click="drawer = true" />
      </div>

      <div class="headernav" v-if="$route.path == '/home'">
        <div class="navs">
          <router-link to="home">{{ languagePack.home }}</router-link>
          <el-dropdown @command="blockCommand">
            <span class="el-dropdown-link">
              {{ languagePack.Blockchain
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in blocknavs"
                :key="item.command"
                :divided="item.divided"
                :command="item.command"
                >{{ item.title }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <a @click="toGo('/contracts')">{{ languagePack.contract }}</a>
          <a @click="toGo('/accounts')">{{ languagePack.account }}</a>
          <a @click="toGo('/validation')">{{ languagePack.Validationnode }}</a>
          <el-dropdown @command="blockCommand">
            <span class="el-dropdown-link">
              {{ languagePack.resources
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item>白皮书</el-dropdown-item> -->
              <el-dropdown-item command="/developapi"
                >开发者API</el-dropdown-item
              >
              <!-- <el-dropdown-item>SDK下载</el-dropdown-item> -->
              <!-- <el-dropdown-item>Tendermint</el-dropdown-item> -->
              <!-- <el-dropdown-item>IBC</el-dropdown-item> -->
              <el-dropdown-item>合约编译器</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="blockCommand">
            <span class="el-dropdown-link">
              {{ languagePack.more
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in morenavs"
                :key="item.command"
                :divided="item.divided"
                :command="item.command"
                >{{ item.title }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="width: 1px; height: 24px; background: #f0f0f0" />

        <div class="langage hidden-sm-and-down">
          <div @click="messageBox('暂未开放')">注册</div>
          <img @click="messageBox('暂未开放')" src="../../assets/img/earths.png" alt=""/>
          <el-dropdown @command="LanguageChange">
            <span class="el-dropdown-link">
              {{ languageType[lang].type
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in languageType"
                :key="item.type"
                :command="item.id"
              >
                {{ item.type }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="headernavM" v-else>
        <SearchBox :boxStyle="{ height: '50px' }"></SearchBox>
        <div>
          <div class="navs">
            <router-link to="home">{{ languagePack.home }}</router-link>
            <el-dropdown @command="blockCommand">
              <span class="el-dropdown-link">
                {{ languagePack.Blockchain
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in blocknavs"
                  :key="item.command"
                  :divided="item.divided"
                  :command="item.command"
                  >{{ item.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <a @click="toGo('/contracts')">{{ languagePack.contract }}</a>
            <a @click="toGo('/accounts')">{{ languagePack.account }}</a>
            <a @click="toGo('/validation')">{{
              languagePack.Validationnode
            }}</a>
            <el-dropdown @command="blockCommand">
              <span class="el-dropdown-link">
                {{ languagePack.resources
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/developapi"
                  >开发者API</el-dropdown-item
                >
                <el-dropdown-item>合约编译器</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="blockCommand">
              <span class="el-dropdown-link">
                {{ languagePack.more
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in morenavs"
                  :key="item.command"
                  :divided="item.divided"
                  :command="item.command"
                  >{{ item.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="width: 1px; height: 24px; background: #f0f0f0" />
          <div class="langage hidden-sm-and-down">
            <div @click="messageBox('暂未开放')">注册</div>
            <img @click="messageBox('暂未开放')" src="../../assets/img/earths.png" alt="" />
            <el-dropdown @command="LanguageChange">
              <span class="el-dropdown-link">
                {{ languageType[lang].type
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in languageType"
                  :key="item.type"
                  :command="item.id"
                >
                  {{ item.type }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <el-drawer
        :append-to-body="true"
        :with-header="false"
        :visible.sync="drawer"
        :before-close="handleClose"
        size="45%"
      >
        <div class="drawerMemu">
          <div @click="toGo('/home')">主页</div>
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item title="区块链">
              <p
                v-for="item in blocknavs"
                :key="item.title"
                @click="toGo(item.command)"
              >
                {{ item.title }}
              </p>
            </el-collapse-item>
            <div>合约</div>
            <div>账户</div>
            <div>验证节点</div>
            <el-collapse-item title="资源">
              <p
                v-for="item in resourcesnavs"
                :key="item.title"
                @click="toGo(item.command)"
              >
                {{ item.title }}
              </p>
            </el-collapse-item>
            <el-collapse-item title="更多">
              <p
                v-for="item in morenavs"
                :key="item.title"
                @click="toGo(item.command)"
              >
                {{ item.title }}
              </p>
            </el-collapse-item>
            <el-collapse-item :title="languageType[lang].type">
              <p
                v-for="item in languageType"
                :key="item.type"
                @click="LanguageChange(item.id)"
              >
                {{ item.type }}
              </p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/index.vue";
export default {
  mixins: [mixin],
  data() {
    return {
      lang: "",
      drawer: false,
      Logo: "",
      activeNames: "1",
      languageType: [
        { type: "English", id: 0 },
        { type: "简体中文", id: 1 },
        { type: "繁体中文", id: 2 },
      ],
      morenavs: [
        { title: "DAO可治理参数", command: "/govern" },
        { title: "DAO基金会地址", command: "/foundation", divided: true },
        { title: "提交代币LOGO", command: "/c" },
        { title: "提交上币申请", command: "/currency_state" },
        { title: "RPC信息", command: "/rpc" },
        { title: "水龙头", command: "/f" },
      ],
      blocknavs: [
        { title: "顶级账户", command: "/blockchain" },
        { title: "查看Txns", command: "/tsx", divided: true },
        { title: "查看区块", command: "/blockcheck" },
      ],
      resourcesnavs: [
        { title: "白皮书", command: "/" },
        { title: "开发者API", command: "/developapi",divided:true },
        { title: "SDK下载", command: "/" },
        { title: "Tendermint", command: "/" },
        { title: "TBC", command: "/" },
        { title: "合约编辑器", command: "/" },
        ],
    };
  },
  created() {
    this.lang = localStorage.getItem("language") || 0;
  },
  mounted() {},
  methods: {
    LanguageChange(val) {
      if (this.lang === val) return;
      this.lang = val;
      localStorage.setItem("language", val);
      // 调用mutation中的方法，通过本地存储切换语言
      this.$store.commit("CHANGE_LANGUAGE");
      this.messageBox("切换成功!", "success");
    },
    blockCommand(command) {
      this.$router.push(command);
    },
    onMenu() {
      console.log(1111);
    },
    handleClose(done) {
      this.drawer = false;
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
  // height: 60px;
  position: relative;
  width: 100%;
  font-size: 14px;
  color: rgba(20, 37, 62, 0.45);
  box-shadow: inset 0 -1px 0 0 #e9eaef;
}
.centerStyle {
  margin: 0 auto;
  position: relative;
  width: 1280px;
  display: flex;
  align-items: center;
}
.headernav {
  position: absolute;
  top: 0;
  right: 0;
  width: 755px;
  display: flex;
  line-height: 60px;
  align-items: center;
  justify-content: space-between;
}

.headernavM {
  position: absolute;
  top: 0;
  right: 0;
  width: 755px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    width: 100%;
  }
}

::v-deep .navs {
  display: flex;
  width: 510px;
  font-size: 14px;
  justify-content: space-around;
  font-weight: 400;
  text-align: center;
  a {
    display: block;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    color: rgba(20, 37, 62, 0.45);
  }
  .el-dropdown {
    color: rgba(20, 37, 62, 0.45);
    cursor: pointer;
  }
}

::v-deep .el-dropdown-menu__item {
  color: rgba(20, 37, 62, 0.45) !important;
}

.logo_style {
  width: 255px;
  height: 36px;
  cursor: pointer;
}
.langage {
  width: 188px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > img {
    cursor: pointer;
  }
  > div {
    cursor: pointer;
  }
}

//弹出层样式
::v-deep .drawerMemu {
  padding: 12px;
  height: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 50px;
  .el-collapse {
    border: none;
  }
  .el-collapse-item__header {
    height: 50px !important;
    line-height: 50px !important;
    font-size: 14px;
    border: none;
    justify-content: center;

    .el-collapse-item__arrow {
      margin: 0;
      padding-left: 8px;
    }
  }
  .el-collapse-item__content {
    padding: 0;
    p {
      font-size: 14px;
      line-height: 50px;
    }
  }
}

@media screen and (max-width: 598px) {
  .centerStyle {
    width: 100%;
    padding: 0 10px;
    height: 60px !important;
    .headernav {
      display: none;
    }
    .headernavM {
      display: none;
      height: 60px !important;
    }
  }
  .logo_style {
    width: 200px;
    height: 30px;
  }
  .memu {
    display: block !important;
    width: 60px;
    text-align: center;
    margin-left: 100px;
    font-size: 24px;
  }
}
</style>
