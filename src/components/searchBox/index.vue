<template>
  <div class="inputVal" :style="boxStyle">
    <el-input
      :placeholder="languagePack.SearchBox"
      v-model="searchVal"
      class="input-with-select"
    >
      <el-select
        v-model="select"
        slot="prepend"
        :placeholder="languagePack.Filter"
      >
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchBtn"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
import mixin from "@/mixins";
export default {
  mixins: [mixin],
  props: {
    boxStyle: {
      type: Object,
    },
  },
  data() {
    return {
      searchVal: "",
      select: "",
    };
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    options() {
      const { address, Tokens, Hash, BlockHeight } = this.languagePack;
      return [
        { label: address, value: "1" },
        { label: Tokens, value: "2" },
        { label: Hash, value: "3" },
        { label: BlockHeight, value: "4" },
      ];
    },
  },
  methods: {
    searchBtn() {
      if (!this.searchVal.trim()) {
        this.messageBox("输入不能为空！ ");
        this.searchVal = "";
        return;
      }
      if(!this.select){
        this.messageBox('请选择搜索条件! ')
        return
      }
      switch (this.select * 1) {
        case 1:
          console.log("通过地址搜索");
          this.queryDealtoAddress(this.searchVal);
          break;
        case 2:
          console.log("通过token搜索");

          break;
        case 3:
          console.log("通过hash搜索交易记录");
          // this.queryDealtoAddress(this.searchVal);
          this.queryDealtoHash(this.searchVal);
          break;
        case 4:
          console.log("通过块搜索");
          this.queryDealtoBlock(this.searchVal)
          break;
        default:
          break;
      }
      // this.searchVal = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.inputVal {
  width: 768px;
}
::v-deep .input-with-select {
  .el-input--suffix {
    .el-input__inner {
      width: 130px;
      text-align: center;
      padding: 0;
      font-weight: 500;
      font-size: 14px;
      color: rgba(20, 37, 62, 0.85);
    }
  }
  .el-input-group__append {
    background: #1E42ED;
    border: none;
    color: #ffffff;
    transition: background .2s cubic-bezier(.645,.045,.355,1) ;
    &:hover{
        background: #6E85F7;
    }
    &:active{
        background: #0E31D6;
    }
  }
}

::v-deep .el-input-group__prepend {
  background: #ffffff !important;
}

::v-deep .input-with-select{
  >input{
    transition: border .2s cubic-bezier(.645,.045,.355,1);
    &:hover{
      border: 1px solid #5671F2;
    }
    &:focus{
      border: 1px solid rgba(30,66,237);
    }
  }
}
</style>
