<template>
  <div class="inputVal" :style="boxStyle">
    <el-input
      :placeholder="languagePack.text06"
      v-model="searchVal"
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend" :placeholder="'请选择'">
        <el-option :label="languagePack.text07" value="1"></el-option>
        <el-option :label="languagePack.text08" value="2"></el-option>
        <el-option :label="languagePack.text09" value="3"></el-option>
        <el-option :label="languagePack.text10" value="4"></el-option>
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
export default {
  props: {
    boxStyle: {
      type: Object,
    },
  },
  data() {
    return {
      searchVal: "",
      select:'',
    };
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
  },
  methods: {
    searchBtn() {
      if (!this.searchVal.trim()) {
        alert("输入不能为空");
        this.searchVal = "";
        return;
      }
      switch (this.select * 1) {
        case 1:
          console.log("通过hash搜索");
          break;
        case 2:
          console.log("通过块搜索");
          break;
        case 3:
          console.log("通过地址搜索");
          break;
        case 4:
          console.log("通过token搜索");
          break;
        default:
          break;
      }
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
    background: #1e42ec;
    border: none;
    color: #ffffff;
  }
}

::v-deep .el-input-group__prepend {
  background: #ffffff !important;
}
</style>
