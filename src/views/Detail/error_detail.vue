<template>
  <div>
    <div class="PageStructure">
      <h3>{{languagePack.prompttext07}}</h3>
      <button @click="toGo('/home')">{{languagePack.prompttext08}}</button>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins";
import {mapState} from 'vuex'
export default {
  mixins: [mixins],
  data() {
    return {
    };
  },
  mounted() {
    
  },
  computed:{
    ...mapState({
      languagePack:state=>state.Language
    })
  }
};
</script>

<style lang="scss" scoped>
.PageStructure {
  background: #ffffff;
  height: 600px;
  text-align: center;
  > h3 {
    font-size: 32px;
    padding: 60px 0;
  }
  > button {
    width: 160px;
    height: 60px;
    background: #1e42ed;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    transition: background 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover {
      background: #6e85f7;
    }
    &:active {
      background: #0e31d6;
    }
    &:focus {
      background: #0e31d6;
    }
  }
}
</style>
