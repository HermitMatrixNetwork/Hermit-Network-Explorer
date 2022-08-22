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
              prop="moniker"
            ></el-table-column>
            <el-table-column
              label="委托数"
              width="270"
              align="right"
            >
            <template slot-scope="scope">
              <div>{{scope.row.tokens}} GHM </div>
            </template>
            </el-table-column>
            <el-table-column
              label="已产生区块数"
              width="270"
              align="right"
            >
            <template slot-scope="scope">
              <div>0</div>
            </template>
            </el-table-column>
            <el-table-column label="锁定时间" width="200">
              <template slot-scope="scope">
                <div>{{ scope.row.unbonding_time }}</div>
              </template>
            </el-table-column>
            <el-table-column label="解锁块高" align="right">
              <template slot-scope="scope">
                <div>{{ scope.row.unbonding_height }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="footer">底部</div>
      </div>
    </div>
  </div>
</template>

<script>
import { allValidationNode } from "@/api/api.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {},
  async mounted() {
    const res = await allValidationNode();
    let arr = res.validators.filter((item) => item.jailed);
    console.log(arr);
    arr.forEach((e) => {
      let {
        description: { moniker },
        tokens,
        min_self_delegation,
        unbonding_time,
        unbonding_height,
      } = e;
      this.list.push({
        moniker,
        tokens,
        min_self_delegation,
        unbonding_height,
        unbonding_time:unbonding_time.split('.')[0].replace('T',' '),
      });
    });
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

@media screen and (max-width:598px) {
  .punishment-main {
    .title{
      padding-left: 10px ;
    }
    width: 100%;
    &-table{
      width: 100%;
    }
  }
}
</style>
