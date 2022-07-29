<template>
  <div class="main">
    <div class="block_title">区块 ：#{{ commitHeight }}</div>
    <div class="block_basic">
      <div class="block_basic_title">详细信息</div>
      <div class="block_basic_content">
        <div
          v-for="item in basicTitle"
          :key="item"
          class="block_basic_content_item"
        >
          <div>
            {{ item }}:<span>{{ commitHeight }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="block_detail">
      <div class="block_detail_title">交易</div>
        <el-table :data="tableData" size="mini" height="515px" class="table_box" :cell-style="columnStyle" :header-cell-style="rowStyle" @cell-click="toDetail">
          <el-table-column prop="transHash" label="交易哈希" :show-overflow-tooltip="true" />
          <el-table-column prop="operationType" label="操作类型" width="80px">
            <template slot-scope="scope">
              <el-tag type="info" size="mini">{{ scope.row.operationType || '' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="block" label="区块" width="100px"/>
          <el-table-column prop="timer" label="时长" width="100px" />
          <el-table-column prop="adress" label="发起地址" width="150px" :show-overflow-tooltip="true"/>
          <el-table-column width="40px">
            <template>
             <el-button type="success" icon="el-icon-right" size="mini" circle />
            </template>
          </el-table-column>
          <el-table-column prop="targetAdress" label="目标地址" width="150px" :show-overflow-tooltip="true"/>
          <el-table-column prop="transValue" label="交易数值" />
          <el-table-column prop="poundage" label="手续费（GHM）" />
       </el-table>
       <el-row type="flex" justify="end" >
        <el-pagination  
          popper-class="popperSelect"
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 25, 50]"
          :page-size="10"
          layout="prev, pager, next, sizes"
          :total="100">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getBlockContent } from "@/api/api.js";
export default {
  data() {
    return {
      block: "",
      blockId: "",
      commitHeight: "",
      basicTitle: [
        "区块高度",
        "父区块哈希",
        "时间戳",
        "提案人",
        "交易数",
        "燃料使用量",
        "区块哈希",
        "燃料总量",
      ],
      tableData: [
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '811分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '118分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '18分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '18分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '81分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '18分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '18分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
        { transHash: 'ldfhjahdfjdfhjfhdkjffdfdsfsfsfafdfsdffh', operationType: '转账', block: '111151414', timer: '8分钟前', adress: 'afdfdfdasfdsfdsfdsfdsafdafdfdfdf', targetAdress: 'dfajdfdfadsfsafdsfadsffhkjadsfsdhkj', transValue: '0 GHM', poundage: '0.121414154544' },
      ],
      currentPage: 1
    };
  },
  created() {
    this.getblockDetail(this.$route.query.height);
  },
  mounted() {
    document.querySelector('.selected').style.color = '#1E42ED'
  },
  methods: {
    // 表头行样式
    rowStyle({row, column, rowIndex, columnIndex}) {
      if (!rowIndex) return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #14253E;'
    },

    // 设置列的字体颜色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      switch(columnIndex) {
        case 0:
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
          break;
        case 1: 
          return 'font-family: PingFangSC-Regular;font-weight: 400;font-size: 12px;color: rgba(20,37,62,0.65);'
          break;
        case 2: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
        case 3: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
        case 4: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
          break;
        case 6:
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
          break;
        case 7:
          return 'font-family: PingFangSC-Regular;font-weight: 400;font-size: 12px;color: rgba(20,37,62,0.65);'
          break;
        case 8:
          return 'font-family: PingFangSC-Regular;font-weight: 400;font-size: 12px;color: rgba(20,37,62,0.65);'
          break;
        default:
          break;
      }
    },

    async getblockDetail(value) {
      const res = await getBlockContent(value);
      const { block, block_id } = res;
        console.log(block);
        console.log(block_id);
      this.commitHeight = block.last_commit.height;
      const arr = []
      arr[0] = this.commitHeight
      arr[1] = ""
      arr[2] = block.header.time
      console.log(arr);
    //   for(let i in this.basicTitle){
    //     console.log(i);
    //   }
    },

    handleSizeChange() {
      let oul = document.querySelectorAll('.el-select-dropdown__list li')
      oul.forEach(item => item.style.color = '')
      let oli = document.querySelector('.selected')
      oli.style.color = '#606266'
    	document.querySelector('.hover').style.color = '#1E42ED'
    },

    handleCurrentChange() {
      console.log('11');
    },

    toDetail(row, column) {
      console.log('row', row);
      switch(column.property){
        case 'transHash':
          console.log('跳转到交易详情');
          break;
        case 'adress':
          console.log('跳转到发起地址详情');
          break;
        case 'targetAdress':
          console.log('跳转到目标地址详情');
          break;
        default:
          break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1280px;
  margin: 0 auto;

  .block_title {
    padding: 16px 0;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 20px;
    color: rgba(20, 37, 62, 0.85);
    letter-spacing: 0;
  }

  .block_basic {
    width: 1280px;
    // height: 252px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    &_title {
      width: 1280px;
      height: 52px;
      line-height: 52px;
      box-shadow: inset 0 -1px 0 0 #e9eaef;
      padding-left: 16px;
    }
    &_content {
      height: 200px;
      padding: 0 16px;
      padding-top: 16px;
      display: flex;
      flex-wrap: wrap;
      align-content: stretch;
      justify-content: flex-start;
      &_item {
        width: 620px;
        height: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 12px;
        color: rgba(20, 37, 62, 0.85);
        span {
          padding-left: 52px;
          height: 28px;
          line-height: 28px;
        }
      }
    }
  }

  .block_detail {
    margin-top: 16px;
    width: 1280px;
    height: 732px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    &_title {
      height: 60px;
      line-height: 60px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 14px;
      color: rgba(20, 37, 62, 0.85);
      letter-spacing: 0;
      padding-left: 16px;
    }
  }

}

::v-deep .el-button {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #55C499;
  background-color: rgba(85,196,153,0.20);
  border-color: rgba(85,196,153,0.10);
}

::v-deep li {
  border: 1px solid #E9EAEF !important;
  border-radius: 2px !important;
  margin: 0 4px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: rgba(20,37,62,0.85);

  &:hover {
    color: #1E42ED !important;
  }

}
::v-deep li.active {
  color: #1E42ED !important;
  border: 1px solid #1E42ED !important;
  border-radius: 2px !important;
}

::v-deep .btn-prev,.btn-next {
  width: 30px;
  border: 1px solid #E9EAEF !important;
  border-radius: 2px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: rgba(20,37,62,0.85);

  &:hover {
    color: #1E42ED !important;
  }
}

::v-deep .btn-next {
  width: 30px;
  border: 1px solid #E9EAEF !important;
  border-radius: 2px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: rgba(20,37,62,0.85);
  padding-left: 6px !important;

  &:hover {
    color: #1E42ED !important;
  }
}

::v-deep th {
  background-color: #F8F9FA !important;
}

::v-deep .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
  // border-color: #1E42ED !important;

  &:hover {
    color: #1E42ED !important;
    border-color: #1E42ED !important;
  }
}

::v-deep .is-focus {
  border-color: #1E42ED !important;
}

::v-deep .el-table__row {
  height: 60px !important;
}

::v-deep .table_box {
  margin-bottom: 13px;
}

@media screen and (max-width:598px) {
  .main{
    width: 355px;
    padding: 0 10px;
    >div{
      width: 100%;
    }
    .block_basic{
      width: 100%;

      .block_basic_content{
        padding: 12px;
        height: auto;
      }
    }
    .block_detail{
      width: 100%;
    }
  }
}
</style>
