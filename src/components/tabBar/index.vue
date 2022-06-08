<template>
  <div class="header">
    <div class="logo">
      <h1>这里是logo</h1>
    </div>
    <div class="navs">
      <router-link to="home">{{ Language.text01 }}</router-link>
      <a @mouseenter="popselect" @mouseleave="upopselect" @click="toblock">{{ Language.text02 }} <Popselect :selectIsShow="selectIsShow"/></a>
      <a>{{ Language.text03 }}</a>
      <a>{{ Language.text04 }}</a>
      
    </div>
    <div class="search">

    </div>
    <div class="langage">
      <select v-model="lang" @change="ccc">
        <option value="0">简体中文</option>
        <option value="1">English</option>
      </select>
    </div>
    <div class="more">
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        <img src="https://scan.platon.network/static/images/icon_menu.svg" alt="">
      </el-button>
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" modal modal-append-to-body size="210px">
        <!-- modal='false' modal-append-to-body='false' -->
        <div class="popTitle">
          <p>{{Language.text01}}</p>
          <p>{{Language.text01}}</p>
          <p>{{Language.text01}}</p> 
          <p>{{Language.text01}}</p>
          <p>{{Language.text01}}</p>
          <p>{{Language.text01}}</p>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import Popselect from '../popselect/index.vue'
import { Language } from './language'
export default {
  components:{ Popselect, Popselect },
  data() {
    return {
      Language: {},
      lang: '',
      drawer: false,
      selectIsShow:false
    }
  },
  created() {
    this.initLanguage()
  },
  mounted() {

  },
  methods: {
    LanguageChange(e) {
      localStorage.setItem('language',e)
      location. reload()
    },
    initLanguage() {
      const langVal = localStorage.getItem('language')
      if (langVal) {
        this.Language = Language[langVal]
        this.lang = langVal
      } else {
        this.Language = Language[0]
        this.lang = 0
      }
    },
    ccc(){
      this.LanguageChange(this.lang)
    },
    popselect(){
      this.selectIsShow = true
    },
    upopselect(){
      this.selectIsShow = false
    },
    toblock(){
      this.$router.push('/blockchain')
    }
  }
}

</script>
<style lang="scss">
.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #808080;

  .logo {
    flex: 1;
    text-align: center;
  }

  .navs {
    display: flex;
    width: 400px;
    height: 80px;
    line-height: 80px;

    a {
      width: 25%;
      text-align: center;
    }

    a:hover{
      cursor: pointer;
    }

    .tablight {
      color: red;
    }
  }

  .langage {
    flex: 1;
  }

  .search {
    flex: 2;
  }

  .more {
    display: none;
  }
}

@media screen and (max-width:768px) {
  .header {
    .langage {
      display: none;
    }

    .navs {
      display: none;
    }

    .search {
      display: none;
    }

    .more {
      display: block;
      flex: 1;
    }
  }
}

.popTitle{
  margin: 10px;
}
</style>
