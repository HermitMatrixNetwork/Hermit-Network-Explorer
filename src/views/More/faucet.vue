<template>
  <div class="main">
    <div class="receive-Token">
      <h3>{{languagePack.faucettext01}}</h3>
      <input type="text" :placeholder="languagePack.faucettext02" />
      <button @click="submit">{{languagePack.faucettext03}}</button>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins';

export default {
  mixins:[mixins],
  name: "More",
  data() {
    return {};
  },
  methods:{
    submit(){
      // this.messageBox(this.languagePack.faucettext04,'error')
      // this.messageBox(this.languagePack.faucettext05,'success')
    }
  },
  computed:{
    languagePack(){
      return this.$store.state.Language
    }
  }
};
</script>
<style lang="scss" scoped>
.main{
    height: calc(100vh - 110px - 210px);
    padding-bottom: 80px;
    position: relative;
}
.receive-Token {
  width: 384px;
  height: 208px;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;

  text-align: center;
  padding: 16px 0 32px 0;

  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);

  > h3 {
    height: 20px;
    font-size: 14px;
    color: rgba(20, 37, 62, 0.85);
  }

  > input {
    width: 320px;
    height: 28px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    border-radius: 2px;
    outline: none;
    font-size: 12px;
    color: #14253E;
    line-height: 20px;
    text-indent: 8px;
    margin: 40px 0;
    transition:border-color .2s cubic-bezier(.645,.045,.355,1);
    &::placeholder {
      color: rgba(20, 37, 62, 0.25);
    }
    &:hover{
        border-color: #5671F2;
    }
    &:focus{
        border-color:#1E42ED;   
    }
  }

  > button {
    width: auto;
    padding: 0 12px;
    height: 32px;
    background: #1e42ed;
    border-radius: 2px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    border: none;
    transition: background .2s cubic-bezier(.645,.045,.355,1) ;
    &:hover{
        background: #6E85F7;
    }
    &:active{
        background: #0E31D6;
    }
  }
}
</style>
