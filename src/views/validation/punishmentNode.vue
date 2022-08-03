<template>
  <div class="punishmentNode">
    <div class="punishment-main">
      <div class="title">惩罚验证节点</div>
      <div class="punishment-main-table">
        <div class="header">总共一个节点</div>
        <div class="tableBody">
          <el-table
            size="mini"
            height="612px"
            :data="list"
            :row-style="{ height: '58px' }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center"
            ></el-table-column>
            <el-table-column
              label="名称"
              width="178"
              prop="title"
            ></el-table-column>
            <el-table-column
              label="委托数"
              width="270"
              align="right"
              prop="num"
            ></el-table-column>
            <el-table-column
              label="已产生区块数"
              width="270"
              align="right"
              prop="block"
            ></el-table-column>
            <el-table-column
              label="锁定时间"
              width="200"
              prop="time"
            ></el-table-column>
            <el-table-column
              label="解锁块高"
              align="right"
              prop="height"
            ></el-table-column>
          </el-table>
        </div>
        <div class="footer">底部</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "ghhhm",
          num: 135,
          block: 0,
          time: "23132",
          height: "875",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.punishment-main {
  width: 1280px;
  margin: 0 auto;
  .title {
    height: 60px;
    line-height: 60px;
    font-weight: 500;
    font-size: 20px;
    color: rgba(20, 37, 62, 0.85);
  }
  &-table {
    width: 1280px;
    height: 732px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    .header,
    .footer {
      height: 60px;
      font-weight: 500;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.85);
      line-height: 60px;
      padding: 0 16px;
    }
    .tableBody {
      height: 612px;
    }
  }
}
</style>
