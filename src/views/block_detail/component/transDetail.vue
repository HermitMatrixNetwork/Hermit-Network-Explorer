<template>
  <div class="main">
    <div class="block_title">交易详情</div>
    <div class="block_title_content">
      dfdfaaaaaaaaa
      <el-pagination
        layout="prev, next"
        :total="50">
      </el-pagination>
    </div>
    <div class="block_basic">
      <div class="block_basic_title">合约执行</div>
      <div class="block_basic_content">
        <div
          v-for="(item, index) in basicTitle"
          :key="index"
          class="block_basic_content_item"
        >
          <div class="block_basic_content_item_s">
            <div style="width: 76px;">
              {{ item.title }}：
            </div>
            <span>{{ item.content }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="block_basic message_detail">
      <div class="block_basic_title">详细信息</div>
      <div class="message_content">
        <div
          v-for="(item, index) in basicTitle1"
          :key="index"
          class="block_basic_content_item message_basic_item"
        >
          <div class="message_basic_content">
            <div style="width: 76px;">
              {{ item.title }}：
            </div>
            <span>{{ item.content }}</span>
          </div>
        </div>
      </div>
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
        { title: "执行方", content: 'dfadfdfdsfdsfdsf' },
        { title: "合约", content: 'XXX' },
        { title: "交易额", content: '2022-11-15' },
        { title: "手续费", content: '11,111,111' }
      ],
      basicTitle1: [
        { title: "状态", content: 'dfadfdfdsfdsfdsf' },
        { title: "交易哈希", content: 'XXX' },
        { title: "时间戳", content: '2022-11-15' },
        { title: "区块高度", content: '11,111,111' },
        { title: "燃料使用量", content: '11,111,111' },
        { title: "燃料总量", content: '11,111,111' }
      ],
      currentPage: 1
    };
  },
  created() {
    
  },
  mounted() {
    
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
    padding: 16px 0 8px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 20px;
    color: rgba(20,37,62,0.85);
    letter-spacing: 0;

    &_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #5671F2;
      margin-bottom: 16px;
    }
  }

  .block_basic {
    width: 1280px;
    height: 252px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    &_title {
      width: 1280px;
      height: 52px;
      // margin-bottom: 16px;
      line-height: 52px;
      box-shadow: inset 0 -1px 0 0 #e9eaef;
      padding-left: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 14px;
      color: rgba(20,37,62,0.85);
      letter-spacing: 0;
    }
    &_content {
      height: 200px;
      padding: 0 16px;
      // padding-top: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &_item {
        // flex: 1;
        width: 620px;
        height: 28px;
        line-height: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 12px;
        span {
          margin-left: 64px;
          height: 28px;
          line-height: 28px;
          color: rgba(20, 37, 62, 0.85);
        }
        &_s {
          display: flex;
        }
      }
      &_item:nth-child(1) span {
        color: #5671F2;
      }

      &_item:nth-child(2) span {
        color: #5671F2;
        // margin-left: 1em;
      }
    }
  }

  .block_detail {
    margin-top: 16px;
    width: 1280px;
    height: 340px;
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

  .message_detail {
    height: 340px;
    margin-top: 16px;

    .message_content {
      padding-left: 16px;
      display: flex;
      flex-direction: column;

      span {
        color: rgba(20, 37, 62, 0.85);
      }

      .message_basic_item {
        height: 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .message_basic_content {
          display: flex;
        }
      }

    }

    .message_basic_item:nth-child(1) span {
      color: #55C499;
    }

    .message_basic_item:nth-child(4) span {
      color: #5671F2;
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
  width: 28px !important;
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
  height: 23px !important;
  line-height: 23px !important;
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
  margin-bottom: 10px;
}

::v-deep .btn-prev {
  width: 28px !important;
  margin-right: 8px !important;
  padding-right: 4px !important;
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
