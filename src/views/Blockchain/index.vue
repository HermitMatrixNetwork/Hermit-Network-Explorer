<template>
  <div class="main">
    <div class="title">GHM的顶级账户</div>
    <!-- <div class="pagination">
      <el-pagination small background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div> -->
    <div class="account_table">
      <div class="account_table_title">展示匿名币余额排名前 1000 账户</div>
      <div class="account_table_box">
        <Table></Table>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table/index.vue";
export default {
  name: "Blockchain",
  components: { Table },
  data() {
    return {};
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 1280px;
  margin: 0 auto;
  padding: 15px;
  .title {
    height: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 16px;
    color: rgba(20, 37, 62, 0.85);
    letter-spacing: 0;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }

  .account_table {
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    &_title {
      padding: 21px 16px;
      height: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.85);
      letter-spacing: 0;
      line-height: 18px;
    }
  }
}
</style>
