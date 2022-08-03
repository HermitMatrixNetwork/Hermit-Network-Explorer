<template>
  <div id="app">
    <TabBar />
    <router-view />
    <Bottom />
  </div>
</template>

<script>
import TabBar from "@/components/tabBar/index.vue";
import Bottom from "@/components/bottom/";
import "element-ui/lib/theme-chalk/display.css";
import '@/assets/css/common.scss'
export default {
  components: { TabBar, Bottom },
  data() {
    return {};
  },
  created() {
    this.$store.commit("CHANGE_LANGUAGE", 123);
  },
  mounted() {},
  watch: {},
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #333;
  overflow-x: hidden;
  background: #f8fafb;
}

/* 修改全局滚动条 */
::-webkit-scrollbar {
  width: 3px;
  height: 0px;
} /* 滚动条的大小 */
::-webkit-scrollbar-track {
  background-color: #6d7277;
} /* 滚动条的滑轨背景颜色 */
::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 0px;
}
a {
  text-decoration: none;
}

ul,
li {
  list-style: none;
}
</style>
