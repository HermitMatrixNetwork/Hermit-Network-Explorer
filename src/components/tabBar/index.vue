<template>
    <el-header class="tabBar">
        <el-row type="flex">
            <el-col :span="6" :sm="12" :xs="12">
                <h1>logo{{ languagePack.text01 }}</h1>
            </el-col>
            <el-col :span="10" class="hidden-sm-and-down">
                <div class="navs">
                    <router-link to="home">{{ languagePack.text01 }}</router-link>
                    <a @click="toblock">{{ languagePack.text02 }}</a>
                    <a>{{ languagePack.text03 }}</a>
                    <a>{{ languagePack.text04 }}</a>
                    <router-link to="contracts">{{ languagePack.text05 }}</router-link>
                </div>
            </el-col>
            <el-col :span="5" />
            <el-col :span="3">
                <div class="langage hidden-sm-and-down">
                    <select v-model="lang" @change="LanguageChange">
                        <option value="0">简体中文</option>
                        <option value="1">English</option>
                    </select>
                </div>
            </el-col>
            <el-col class="more hidden-md-and-up" :sm="12" :xs="12">
                <el-button @click="drawer = true" type="primary" style="margin-left: 16px">
                    <img src="https://scan.platon.network/static/images/icon_menu.svg" alt="" />
                </el-button>
                <el-drawer
                    title="我是标题"
                    :visible.sync="drawer"
                    :with-header="false"
                    size="210px"
                >
                    <div class="popTitle">
                        <p>{{ languagePack.text01 }}</p>
                        <p @click="toblock">{{ languagePack.text02 }}</p>
                        <p>{{ languagePack.text01 }}</p>
                        <p>{{ languagePack.text01 }}</p>
                        <p>{{ languagePack.text01 }}</p>
                        <p @click="sss">中文简体/English</p>
                    </div>
                </el-drawer>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
export default {
    data() {
        return {
            lang: '',
            drawer: false,
        };
    },
    created() {
        this.lang = localStorage.getItem('language') || 1;
    },
    mounted() {},
    methods: {
        LanguageChange() {
            localStorage.setItem('language', this.lang);
            // 调用mutation中的方法，通过本地存储切换语言
            this.$store.commit('CHANGE_LANGUAGE');
        },
        toblock() {
            this.$router.push('blockchain');
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
    background: #fff;
    width: 100%;
}
.el-row {
    height: 100%;
    overflow: hidden;
}
.el-col {
    line-height: 60px;
}
.navs {
    display: flex;
    a {
        width: 20%;
        display: block;
        height: 60px;
        overflow: hidden;
        cursor: pointer;
        text-align: center;
    }
}
@media screen and (max-width: 598px) {
    .tabBar {
        // position: fixed;
        // // z-index: 999;
    }
}
</style>
