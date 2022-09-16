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
          <router-link
            to="home"
            :class="$route.meta.ID == 1 ? 'pathStyle' : ''"
            >{{ languagePack.headertext01 }}</router-link
          >
          <el-dropdown @command="blockCommand" placement="bottom">
            <span class="el-dropdown-link">
              {{ languagePack.headertext02 }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in blocknavs"
                :key="item.command"
                :divided="item.divided"
                :command="item.command"
                >{{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a @click="toGo('/contracts')">{{ languagePack.headertext06 }}</a>
          <a @click="toGo('/accounts')">{{ languagePack.headertext07 }}</a>
          <a @click="toGo('/validation')">{{ languagePack.headertext08 }}</a>
          <el-dropdown @command="blockCommand" placement="bottom">
            <span class="el-dropdown-link"
              >{{ languagePack.headertext09
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in resourcesnavs"
                :key="item.command"
                :divided="item.divided"
                :command="item.command"
                >{{ item.title }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="blockCommand" placement="bottom">
            <span class="el-dropdown-link">
              {{ languagePack.headertext16
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
          <div @click="messageBox('暂未开放')">
            {{ languagePack.headertext22 }}
          </div>
          <img
            @click="messageBox('暂未开放')"
            src="../../assets/img/earths.png"
            alt=""
          />
          <el-dropdown @command="LanguageChange" placement="bottom">
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
            <router-link to="home">{{ languagePack.headertext01 }}</router-link>
            <el-dropdown @command="blockCommand" placement="bottom">
              <span
                class="el-dropdown-link"
                :class="$route.meta.ID == 2 ? 'pathStyle' : ''"
              >
                {{ languagePack.headertext02
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="specialEldropdown">
                <el-dropdown-item
                  v-for="item in blocknavs"
                  :key="item.command"
                  :divided="item.divided"
                  :command="item.command"
                  >{{ item.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <a
              @click="toGo('/contracts')"
              :class="$route.meta.ID == 3 ? 'pathStyle' : ''"
              >{{ languagePack.headertext06 }}</a
            >
            <a
              @click="toGo('/accounts')"
              :class="$route.meta.ID == 4 ? 'pathStyle' : ''"
              >{{ languagePack.headertext07 }}</a
            >
            <a
              @click="toGo('/validation')"
              :class="$route.meta.ID == 5 ? 'pathStyle' : ''"
              >{{ languagePack.headertext08 }}</a
            >
            <el-dropdown @command="blockCommand" placement="bottom">
              <span
                class="el-dropdown-link"
                :class="$route.meta.ID == 6 ? 'pathStyle' : ''"
                >{{ languagePack.headertext09
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="specialEldropdown">
                <el-dropdown-item
                  v-for="item in resourcesnavs"
                  :key="item.command"
                  :divided="item.divided"
                  :command="item.command"
                  >{{ item.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="blockCommand" placement="bottom">
              <span
                class="el-dropdown-link"
                :class="$route.meta.ID == 7 ? 'pathStyle' : ''"
              >
                {{ languagePack.headertext16
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="specialEldropdown">
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
            <div @click="messageBox(languagePack.prompttext01)">
              {{ languagePack.headertext22 }}
            </div>
            <img
              @click="messageBox(languagePack.prompttext01)"
              src="../../assets/img/earths.png"
              alt=""
            />
            <el-dropdown @command="LanguageChange" placement="bottom">
              <span
                class="el-dropdown-link"
                style="height: 40px; line-height: 40px"
              >
                {{ languageType[lang].type
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="specialEldropdown">
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

      <!-- 移动端导航栏 -->
      <el-drawer
        :append-to-body="true"
        :with-header="false"
        :visible.sync="drawer"
        :before-close="handleClose"
        size="45%"
      >
        <div class="drawerMemu">
          <div @click="toGo('/home')">{{ languagePack.headertext01 }}</div>
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item :title="languagePack.headertext02">
              <p
                v-for="item in blocknavs"
                :key="item.title"
                @click="toGo(item.command)"
              >
                {{ item.title }}
              </p>
            </el-collapse-item>
            <div @click="toGo('/contracts')">
              {{ languagePack.headertext06 }}
            </div>
            <div @click="toGo('/accounts')">
              {{ languagePack.headertext07 }}
            </div>
            <div @click="toGo('/validation')">
              {{ languagePack.headertext08 }}
            </div>
            <el-collapse-item :title="languagePack.headertext09">
              <p
                v-for="item in resourcesnavs"
                :key="item.title"
                @click="toGo(item.command)"
              >
                {{ item.title }}
              </p>
            </el-collapse-item>
            <el-collapse-item :title="languagePack.headertext16">
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
    <div class="placeholderTab" style="display: none" />
  </div>
</template>

<script>
import mixin from "@/mixins";
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
      this.messageBox(this.languagePack.prompttext04, "success");
    },
    blockCommand(command) {
      if (command === "/whitebook")
        return window.open(
          "http://158.247.237.78:8888/uploads/file/098f6bcd4621d373cade4e832627b4f6_20220915065306.pdf"
        );
      this.toGo(command);
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
    morenavs() {
      const {
        headertext17,
        headertext18,
        headertext19,
        headertext20,
        headertext21,
      } = this.languagePack;
      return [
        { title: headertext17, command: "/govern" },
        { title: headertext18, command: "/foundation", divided: true },
        { title: headertext19, command: "/currency_state" },
        { title: headertext20, command: "/rpc" },
        { title: headertext21, command: "/faucet" },
      ];
    },
    resourcesnavs() {
      const {
        headertext10,
        headertext11,
        headertext12,
        headertext13,
        headertext14,
        headertext15,
      } = this.languagePack;
      return [
        { title: headertext10, command: "/whitebook" },
        { title: headertext11, command: "/developapi", divided: true },
        { title: headertext12, command: "/b" },
        { title: headertext13, command: "/c" },
        { title: headertext14, command: "/d" },
        { title: headertext15, command: "/compile" },
      ];
    },
    blocknavs() {
      const { headertext03, headertext04, headertext05 } = this.languagePack;
      return [
        { title: headertext03, command: "/blockchain" },
        { title: headertext04, command: "/tsx", divided: true },
        { title: headertext05, command: "/blockcheck" },
      ];
    },
  },
  watch: {
    $route(value) {
      this.drawer = false;
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
  z-index: 3333;
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
  .navs {
    line-height: 60px;
  }
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

.navs {
  display: flex;
  width: 510px;
  font-size: 14px;
  justify-content: space-around;
  line-height: 40px;
  text-align: center;
  a {
    display: block;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    color: rgba(20, 37, 62, 0.45);
  }
  .el-dropdown-link {
    color: rgba(20, 37, 62, 0.45);
    cursor: pointer;
  }
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

.el-dropdown-link {
  height: 100%;
  display: block;
}

@media screen and (max-width: 598px) {
  .tabBar {
    z-index: 1;
    .centerStyle {
      position: fixed;
      background: #ffffff;
      width: 100%;
      padding: 0 10px;
      height: 60px !important;
      justify-content: space-between;
      .headernav {
        display: none;
      }
      .headernavM {
        display: none;
        height: 60px !important;
      }
    }
    .placeholderTab {
      display: block !important;
      height: 60px;
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

.pathStyle {
  font-weight: 600;
  color: rgba(20, 37, 62, 0.85) !important;
}
</style>
<style lang="scss">
.el-dropdown-menu {
  width: 174px !important;
  white-space: nowrap;
  .el-dropdown-menu__item {
    color: rgba(20, 37, 62, 0.45) !important;
    line-height: 40px !important;
    &:hover {
      background: #ecefff !important;
      font-size: 14px;
      color: #1e42ed !important;
    }
  }
  .popper__arrow {
    display: none !important;
  }
}
.el-dropdown {
  &:hover {
    .el-icon-arrow-down {
      transform: rotate(180deg);
    }
  }
  .el-dropdown-link {
    .el-icon-arrow-down {
      transition: all 0.3s;
      pointer-events: all;
      &::before {
        content: "\e790";
      }
    }
  }
}

.specialEldropdown {
  padding: 16px 0 10px !important;
}
</style>
