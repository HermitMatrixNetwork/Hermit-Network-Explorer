<template>
  <div id="app">
    <TabBar />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <Bottom />
  </div>
</template>

<script>
import TabBar from "@/components/tabBar/index.vue";
import Bottom from "@/components/bottom/";
import "element-ui/lib/theme-chalk/display.css";
import "@/assets/css/common.scss";
import '@/assets/css/init.css'
export default {
  components: { TabBar, Bottom },
  data() {
    return {};
  },
  created() {
    this.$store.commit("CHANGE_LANGUAGE", 123);
    // console.log(this.$route);

    if(this.$route.path == '/hash_detail'){
      this.$router.replace('/home')
    }
    if(this.$route.path == '/node_detail'){
      this.$router.go(-1)
    }
  },
  mounted() {},
  watch: {},
};
</script>
<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  background: #f8fafb;
}

/* 修改全局滚动条 */
::-webkit-scrollbar {
  width: 3px;
  height: 0px;
  display: none;
} /* 滚动条的大小 */
::-webkit-scrollbar-track {
  background-color: #6d7277;
} /* 滚动条的滑轨背景颜色 */
::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 0px;
}
</style>
