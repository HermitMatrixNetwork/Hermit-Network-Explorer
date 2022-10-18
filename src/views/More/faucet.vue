<template>
  <div class="main">
    <div class="receive-Token">
      <h3>{{ languagePack.faucettext01 }}</h3>
      <input
        type="text"
        v-model="value"
        :placeholder="languagePack.faucettext02"
      />
      <button @click="submit">{{ languagePack.faucettext03 }}</button>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins";
// import axios from  'axios'
import { testToken } from "@/api/api";
export default {
  mixins: [mixins],
  name: "More",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    submit() {
      if (this.value.trim() && this.value.includes("ghm1")) {
        testToken(this.value, true).then(
          (res) => {
            this.messageBox(this.languagePack.faucettext05, "success");
          },
          (error) => {
            this.messageBox(this.languagePack.faucettext04, "error");
          }
        );
      }else{
          this.messageBox(this.languagePack.prompttext16,'error')
      }
      this.value = ''
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
.main {
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
  left: 50%;
  transform: translate(-50%, -50%);

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
    color: #86909c;
    line-height: 20px;
    text-indent: 8px;
    margin: 40px 0;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &::placeholder {
      color: rgba(20, 37, 62, 0.25);
    }
    &:hover {
      border-color: #5671f2;
    }
    &:focus {
      border-color: #1e42ed;
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
    transition: background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      background: #6e85f7;
    }
    &:active {
      background: #0e31d6;
    }
  }
}
</style>
