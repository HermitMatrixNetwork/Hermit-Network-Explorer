<template>
  <div class="main">
    <div class="title">交易</div>

    <div class="deal_table">
      <div class="deal_table_title">
        总共寻获超过> 1,081,774 条交易（仅显示最新500K记录）
        <div class="pagination">
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="1000"
          >
          </el-pagination>
        </div>
      </div>
      <div class="deal_table_box">
        <Table></Table>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table/index.vue";
export default {
  name: "Tsx",
  components: {
    Table,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 1280px;
  margin: 0 auto;
  padding: 16px;
  .title {
    height: 28px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 16px;
    color: rgba(20, 37, 62, 0.85);
    letter-spacing: 0;
  }
//   .pagination {
    
//     justify-content: flex-end;
//   }

  .deal_table {
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    &_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
