<template>
  <div class="inputVal" :style="boxStyle">
    <el-input
      :placeholder="languagePack.hometext07"
      v-model="searchVal"
      class="input-with-select"
    >
      <el-select
        v-model="select"
        slot="prepend"
        :placeholder="languagePack.hometext02"
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
    currentHeight: {
      type: Number | String,
    },
  },
  data() {
    return {
      searchVal: "",
      select: 0,
    };
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    options() {
      const { hometext02, hometext03, hometext04, hometext05, hometext06 } =
        this.languagePack;
      return [
        { label: hometext02, value: 0 },
        { label: hometext03, value: 1 },
        { label: hometext04, value: 2 },
        { label: hometext05, value: 3 },
        { label: hometext06, value: 4 },
      ];
    },
  },
  methods: {
    searchBtn() {
      if (!this.searchVal.trim()) {
        this.messageBox(this.languagePack.prompttext06);
        this.searchVal = "";
        return;
      }
      if (this.select === 0) {
        this.filtersSearchValue(this.searchVal);
      }
      let value = this.searchVal.replace(/\s+/g, "");
      switch (this.select * 1) {
        case 1:
          console.log("通过地址搜索");
          this.queryDealtoAddress(value);
          break;
        case 2:
          console.log("通过token搜索");
          console.log(this.select);
          break;
        case 3:
          // console.log("通过hash搜索交易记录");
          this.queryDealtoHash({
            hash: value,
            random: Math.floor(Math.random() * 10000),
          });
          break;
        case 4:
          // console.log("通过块搜索");
          if (value > this.currentHeight)
            return this.messageBox("暂未出块", "error");
          this.queryDealtoBlock(value);
          break;
        default:
          break;
      }
      this.searchVal = "";
    },
    filtersSearchValue(string) {
      console.log("begain");
      if (string.includes("ghm1")) {
        this.select = 1;
      } else if (!isNaN(string)) {
        this.select = 4;
      } else if (string.length === 64) {
        this.select = 3;
      } else {
        this.messageBox(this.languagePack.prompttext07,'error')
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
      font-weight: bold;
      font-size: 14px;
      &::placeholder {
        color: #14253e !important;
      }
    }
  }
  .el-input-group__append {
    background: #1e42ed;
    border: none;
    color: #ffffff;
    transition: background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      background: #6e85f7;
    }
    &:active {
      background: #0e31d6;
    }
  }
}

::v-deep .el-input-group__prepend {
  background: #ffffff !important;
}

::v-deep .input-with-select {
  > input {
    transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      border: 1px solid #5671f2;
    }
    &:focus {
      border: 1px solid rgba(30, 66, 237);
    }
  }
}
</style>

<style lang="scss">
.el-select-dropdown {
  width: 130px;
  z-index: 3334 !important;
  margin: 0;
  .popper__arrow {
    display: none;
  }
  .el-scrollbar {
    .el-select-dropdown__list {
      .el-select-dropdown__item {
        color: rgba(20, 37, 62, 0.45) !important;
        height: 40px;
        line-height: 40px;
        &:hover {
          background: #ecefff !important;
          color: #1e42ed !important;
        }
      }
    }
  }
}
.el-popper {
  margin: 0 !important;
}
.el-select__caret {
  &::before {
    content: "\e78f";
  }
}
</style>
