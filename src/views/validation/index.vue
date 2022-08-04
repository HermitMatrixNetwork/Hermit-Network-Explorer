<template>
  <div class="validation">
    <div class="validationMain">
      <h3 class="title">验证节点</h3>

      <div class="column">
        <div class="column-item" v-for="(item, index) in nodeData" :key="index">
          <BasicTitle :title="item.title">
            <template #message>
              <div class="column-basic">
                <p v-for="(value, key) in item.basic" :key="key">
                  {{ key }}:{{ value }}
                </p>
              </div>
            </template>
          </BasicTitle>
        </div>
        <!-- <div class="column-item">实时质押信息</div> -->
      </div>

      <div class="validation-table">
        <div class="validation-table-header">
          <div class="left">
            <div class="navs">
              <span
                v-for="(item, index) in ['全部', '活跃中', '候选中']"
                :key="index"
                :class="screenIndex == index ? 'navSelected' : ''"
                @click="navBtn(index)"
                >{{ item }}</span
              >
            </div>

            <!-- 表头搜索框 -->
            <el-input placeholder="请输入验证节点查询" v-model="searchValue">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>

          <div class="right">
            <span>惩罚节点</span>
            <span>历史验证节点</span>
          </div>
        </div>

        <div class="validation-table-body">
          <el-table
            :data="nodeList"
            size="mini"
            height="612px"
            :row-style="{ height: '58px' }"
            @row-click="TableClick"
          >
            <el-table-column
              label="排名"
              width="80"
              align="center"
              type="index"
            ></el-table-column>
            <el-table-column
              label="节点名称"
              width="160"
            >
            <template slot-scope="scope">
              <div class="moniker">
                <img src="@/assets/img/bottom-bar_github.png" alt="">
                {{scope.row.moniker}}
              </div>
            </template>
            </el-table-column>
            <el-table-column label="节点地址" width="180">
              <template slot-scope="scope">
                <p class="specialFont">
                  {{ scope.row.operator_address | sliceAddress }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="88">
              <template slot-scope="scope">
                <div class="stateColumn">
                  <div
                    :style="{
                      width: '6px',
                      height: '6px',
                      borderRadius: '6px',
                      marginRight: '6px',
                      background:
                        scope.row.status == 'BONDED' ? '#55C499' : '#ED422B',
                    }"
                  />
                  {{ scope.row.status }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="总质押" width="180" align="right">
              <template slot-scope="scope">
                <p>{{ scope.row.tokens | toMoney }} GHM</p>
              </template>
            </el-table-column>
            <el-table-column label="委托数" width="168" align="right">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.tokens - scope.row.min_self_delegation * 1e5 | toMoney}} GHM
                </p>
              </template>
            </el-table-column>
            <el-table-column label="委托奖励比例" width="110">
              <template slot-scope="scope">
                <p>{{ (1 - scope.row.commission) * 100 }} %</p>
              </template>
            </el-table-column>
            <el-table-column
              label="委托者数"
              width="120"
              align="right"
              prop="entrustPerson"
            ></el-table-column>
            <el-table-column
              label="活跃度"
              width="80"
              prop="active"
            ></el-table-column>
            <el-table-column label="佣金">
              <template slot-scope="scope">
                <p>{{ scope.row.commission * 100 }} %</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="validation-table-bottom">
          <el-pagination
            small
            layout="prev, pager, next,sizes"
            :total="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 25, 50]"
            :page-size="10"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allValidationNode } from "@/api/api.js";
import mixin from "@/mixins/index.vue";
export default {
  mixins: [mixin],
  data() {
    return {
      searchValue: "",
      currentPage2: 5,
      screenIndex: 0,
      pagination:0,
      nodeData: [
        {
          title: "节点概览",
          basic: {
            节点总数: 253,
            活跃节点数: 86,
            候选节点数: 354,
          },
        },
        {
          title: "实时质押信息",
          basic: {
            总质押: "120M GHM",
            接受委托量: "1,386,169,037.96114985 GHM",
            质押率: "0%",
          },
        },
      ],
      nodeList: [],
      newNodeList: [],
    };
  },
  created() {
    this.queryAllValidation();
  },
  mounted() {
    // this.newNodeList = JSON.parse(JSON.stringify(this.nodeList));
  },
  methods: {
    async queryAllValidation() {
      const res = await allValidationNode();
      console.log("获取所有验证节点信息", res);
      let arr = [];
      res.validators.forEach((item) => {
        let {
          description: { moniker },
          status,
          tokens,
          jailed,
          min_self_delegation,
          operator_address,
          commission,
        } = item;
        arr.push({
          moniker,
          status: status.split("_").pop(),
          tokens,
          jailed,
          operator_address,
          commission: commission.commission_rates.rate,
          min_self_delegation,
        });
      });
      this.nodeList = arr.sort((a, b) => b.tokens - a.tokens);
      console.log(this.nodeList);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    navBtn(index) {
      this.screenIndex = index;
      if (index == 0)
        return (this.newNodeList = JSON.parse(JSON.stringify(this.nodeList)));
      this.newNodeList = this.nodeList.filter((item) => {
        return index == 1 ? item.state == "活跃中" : item.state == "候选中";
      });
    },

    TableClick(val){
      console.log(val);
    }
  },
};
</script>

<style lang="scss" scoped>
.validationMain {
  width: 1280px;
  margin: 0 auto;
  .title {
    padding: 16px 0;
  }

  .column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-item {
      width: 632px;
      height: 208px;
    }
    &-basic {
      height: 120px;
      > p {
        height: 28px;
        line-height: 28px;
        margin-bottom: 16px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(20, 37, 62, 0.85);
      }
    }
  }

  .validation-table {
    box-sizing: border-box;
    margin-top: 16px;
    // height: 732px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    &-header {
      height: 60px;
      display: flex;
      padding: 0 16px;
      align-items: center;
      justify-content: space-between;
      .left {
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .navs {
          width: 150px;
          > span {
            padding: 4px 8px;
            height: 20px;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.65);
            background: #ffffff;
            border: 1px solid #e9eaef;
            // border-radius: 2px 0 0 2px;
            // border-radius: 2px 0px 0px 2px;
          }
        }
      }

      .right {
        > span {
          padding: 0 10px;
          font-weight: 400;
          font-size: 12px;
          color: #1e42ed;
          line-height: 18px;
        }
      }
    }

    &-body {
      // height: 600px;
      .stateColumn {
        display: flex;
        align-items: center;
      }
      .moniker{
        display: flex;
        align-items: center;
        >img{
          width: 24px;
          padding: 0 8px;
        }
      }
    }
    &-bottom {
      height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.navSelected {
  border: 1px solid #5671f2 !important;
  color: #5671f2 !important;
}

::v-deep .el-input {
  width: 240px;
  .el-input__inner {
    height: 28px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    font-weight: 400;
    font-size: 12px;
    color: rgba(20, 37, 62, 0.25);
    line-height: 20px;
  }
}
::v-deep .el-input-group__append {
  padding: 0 6px;
}
</style>
