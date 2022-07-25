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
      <Table />
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table/index.vue";
import { getBlockContent } from "@/api/api.js";
export default {
  components: { Table },
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
      basicData:{}
    };
  },
  created() {
    this.getblockDetail(this.$route.query.height);
  },
  mounted() {
    document.querySelector("body").style.background = "#F8FAFB";
  },
  methods: {
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
</style>
