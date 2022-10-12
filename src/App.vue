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
import {getValidationList} from '@/api/validation'
import "element-ui/lib/theme-chalk/display.css";
import "@/assets/css/common.scss";
import '@/assets/css/init.css'
export default {
  components: { TabBar, Bottom },
  data() {
    return {};
  },
  async created() {
    this.$store.commit("CHANGE_LANGUAGE", 123);
    //初次进入 请求所有验证节点并存储
    if(!sessionStorage.getItem('node')){
      getValidationList(0,0).then(({data:{list}})=>{
      // console.log('App',list);
      let nodes = list.sort((a, b) => b.tokens - a.tokens);
      sessionStorage.setItem('node',JSON.stringify(nodes))
     })
    }
  },
  mounted() {
    // window.addEventListener('message', (e) => {
    //     console.log('iframe=' + e.data);
    //     // this.$router.back()
    // }, false);
  },
  watch: {},
};
</script>
<style lang="scss">
html,
body,
#app {
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  background: #f8fafb;
  height: 100vh;
}
@media screen and (max-width:598px) {
  html,
body,
#app {
  height: 100%;
}
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
