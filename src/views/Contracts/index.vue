<template>
  <div class="contracts-main">
    <div class="main">
      <div class="title">{{ languagePack.contracttext01 }}</div>
      <div class="contracts_basic">
        <div class="contracts_basic_item">
          <div class="icon"></div>
          <div class="explain">
            <p>{{ languagePack.contracttext02 }}</p>
            <h3>{{ computeCount | toMoney }}</h3>
          </div>
        </div>
        <div class="contracts_basic_item">
          <div class="icon"></div>
          <div class="explain">
            <p>{{ languagePack.contracttext03 }}</p>
            <h3>{{ userCount | toMoney }}</h3>
          </div>
        </div>
        <div class="contracts_basic_item">
          <div class="icon"></div>
          <div class="explain">
            <p>{{ languagePack.contracttext04 }}</p>
            <h3>$0.48</h3>
          </div>
        </div>
      </div>
      <div class="contracts_table">
        <div class="contracts_table_title">
          <p>总共 <span style="color: #5671f2">1,081,774 </span>个区块</p>
          <el-pagination
            small
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="prev, pager, next"
            :total="pagination"
            hide-on-single-page
          >
          </el-pagination>
        </div>
        <el-table
          height="656px"
          :data="tableList"
          style="width: 100%"
          :header-cell-class-name="'tableHeaderCellStyle'"
          :row-class-name="'tableRowStyle'"
          v-loading="loading"
        >
          <el-table-column
            prop="contract_id"
            :label="languagePack.contracttext05"
            width="160"
          >
          </el-table-column>
          <el-table-column :label="languagePack.contracttext06" width="548">
            <template slot-scope="scope">
              <p
                class="specialFont"
                @click="toContractDetail(scope.row.contract_address)"
              >
                {{ scope.row.contract_lable }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="compute_count"
            :label="languagePack.contracttext07"
            width="160"
            align="right"
          >
          </el-table-column>
          <el-table-column
            prop="user_count"
            :label="languagePack.contracttext08"
            width="160"
            align="right"
          >
          </el-table-column>
          <el-table-column :label="languagePack.contracttext09" align="right">
            <template slot-scope="scope">
              <div>
                <p>{{ scope.row.value }} GHM</p>
                <p>$ 0.00</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 25, 50]"
            :page-size="10"
            layout="prev, pager, next, sizes"
            :total="pagination"
            hide-on-single-page
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getContract } from "@/api/contract";
import axios from "axios";
import mixins from "@/mixins";

export default {
  mixins: [mixins],
  data() {
    return {
      tableList: [],
      loading: true,
      pagination: 0,
    };
  },
  created() {
    this.getData(10);
  },
  methods: {
    async getData(limit) {
      const res = await getContract(limit);
      console.log("合约列表", res);
      // let arr = res.data.list;
      // arr.forEach((item) => {
      //   item.user_count = Object.keys(item.user_count).length;
      // });
      this.tableList = res.data.list;
      this.pagination = res.data.total;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    toContractDetail(address) {
      // console.log(address);
      this.$router.push({ path: "/contract_detail", query: { address } });
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    //计算总用户数量
    userCount() {
      let count = 0;
      if (Array.isArray(this.tableList)) {
        this.tableList.forEach((item) => {
          count += item.user_count;
        });
      }
      return count;
    },
    //计算总运算次数
    computeCount() {
      let count = 0;
      if (Array.isArray(this.tableList)) {
        this.tableList.forEach((item) => {
          count += item.compute_count;
        });
      }
      return count;
    },
  },
  watch: {
    tableList(value) {
      if (Array.isArray(value)) {
        this.loading = this.tableList.length === 0 ? true : false;
      } else {
        this.loading = false;
      }
    },
    deep: true,
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1280px;
  margin: 0 auto 80px;
  .title {
    height: 60px;
    line-height: 60px;
    font-weight: bold;
  }

  .contracts_basic {
    width: 1280px;
    height: 128px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_item {
      height: 128px;
      padding: 32px 64px;
      flex: 1;
      display: flex;
      align-items: center;
      .explain {
        padding-left: 23px;
        p {
          height: 17px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(20, 37, 62, 0.45);
          letter-spacing: 0;
        }
        h3 {
          height: 29px;
          font-family: DIN-Bold;
          font-weight: Bold;
          font-size: 24px;
          color: rgba(20, 37, 62, 0.85);
          letter-spacing: 0;
        }
      }
      .icon {
        width: 64px;
        height: 64px;
        background-size: 100% 100%;
      }
      &:nth-child(1) {
        .icon {
          background: url("../../assets/img/contract_icon1.png");
        }
      }
      &:nth-child(2) {
        .icon {
          background: url("../../assets/img/contract_icon2.png");
        }
      }
      &:nth-child(3) {
        .icon {
          background: url("../../assets/img/contract_icon3.png");
        }
      }
    }
  }

  .contracts_table {
    width: 1280px;
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
      font-weight: bold;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.85);
      letter-spacing: 0;
    }
  }

  .table_bottom {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

@media screen and (max-width: 598px) {
  .contracts-main {
    margin: 0 10px;
  }
  .main {
    width: 100%;

    .contracts_basic {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;

      &_item {
        padding: 10px 0;
        width: 100%;
        .explain {
          padding-left: 64px;
        }
        .icon {
          margin-left: 10px;
        }
      }
    }

    .contracts_table {
      width: 100%;
    }
  }
}
</style>
