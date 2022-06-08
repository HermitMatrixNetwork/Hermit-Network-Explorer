<template>
  <div id="app">
    <TabBar/>
    <router-view/>
    <Bottom/>
  </div>
</template>

<script>
import TabBar from '@/components/tabBar/index.vue';
import Bottom from '@/components/bottom/'
export default{
  components:{ TabBar,Bottom},
  data(){
    return{
      
    }
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body,#app{
  box-sizing: border-box;
  color: #333;
  // font-size: calc(100vw/750*100);
}
a{
  text-decoration: none;
  color: #333;
}
</style>
