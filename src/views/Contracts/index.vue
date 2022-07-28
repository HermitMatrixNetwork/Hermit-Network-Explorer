<template>
  <div class="main">
    <div class="title">合约</div>
    <div class="contracts_basic">
        <div class="contracts_basic_item"></div>
    </div>
    <div class="contracts_table">
      <div class="contracts_table_title">
        总共 1,081,774 个区块
         <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="1000"
          >
          </el-pagination>
      </div>
      <Table />
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table/index.vue";
export default {
  components: { Table },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1280px;
  margin: 0 auto;
  .title {
    padding: 16px 0;
  }

  .contracts_basic {
    width: 1280px;
    height: 128px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    margin-bottom: 16px;

    &_item{
        height: 64px;
        padding: 32px 64px;
    }
  }

  .contracts_table {
    width: 1280px;
    height: 776px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    &_title {
      height: 60px;
      padding-left: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.85);
      letter-spacing: 0;
    }
  }
}
</style>
