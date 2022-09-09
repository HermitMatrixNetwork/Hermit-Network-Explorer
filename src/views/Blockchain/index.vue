<template>
  <div>
    <h3>{{ languagePack.toptext01 }}</h3>
    <main class="main">
      <div class="table_title" v-html="languagePack.toptext02"></div>
      <div class="table_body">
        <el-table
          :data="tableData"
          size="mini"
          height="612px"
          :row-style="{ height: '58px' }"
          :header-cell-class-name="'tableHeaderCellStyle'"
          :row-class-name="'tableRowStyle'"
          v-loading="loading"
        >
          <el-table-column
            type="index"
            :label="languagePack.toptext03"
            width="80px"
            align="center"
          />
          <el-table-column
            prop="address"
            :label="languagePack.toptext04"
            width="420"
          >
            <template slot-scope="scope">
              <div class="specialFont" @click="toDetail(scope.row.address)">
                {{ scope.row.address }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tag" :label="languagePack.toptext05" />
          <el-table-column :label="languagePack.toptext06" align="right">
            <template slot-scope="scope">
              <div>{{ scope.row.balance | toMoney }} GHM</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="percentage"
            :label="languagePack.toptext07"
            width="160"
          >
            <template slot-scope="scope">
              <div>{{ (scope.row.percentage * 100).toFixed(8) }} %</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="tx_count"
            :label="languagePack.toptext08"
            width="100px"
            align="right"
          />
        </el-table>
      </div>
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 25, 50]"
          :page-size="page.pageSize"
          layout="prev, pager, next, sizes"
          :total="pagination"
        >
        </el-pagination>
      </el-row>
    </main>
  </div>
</template>

<script>
import { queryAccountList } from "@/api/api";
import mixins from "@/mixins";
export default {
  name: "Blockchain",
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      page: {
        pageSize: 10,
        currentPage: 0,
      },
      pagination: 0,
      loading: true,
    };
  },
  mounted() {
    document.querySelector(".selected").style.color = "#1E42ED";
  },
  created() {
    let { pageSize, currentPage } = this.page;
    this.getData(pageSize, currentPage);
  },
  methods: {
    handleSizeChange(val) {
      let oul = document.querySelectorAll(".el-select-dropdown__list li");
      oul.forEach((item) => (item.style.color = ""));
      let oli = document.querySelector(".selected");
      oli.style.color = "#606266";
      document.querySelector(".hover").style.color = "#1E42ED";

      this.tableData = [];
      this.getData((this.page.pageSize = val), (this.page.currentPage = 0));
    },

    handleCurrentChange(index) {
      this.page.currentPage = index - 1;
      let { pageSize, currentPage } = this.page;
      this.tableData = [];
      this.getData(pageSize, currentPage);
    },

    async getData(limit, index) {
      let { data } = await queryAccountList(limit, index);
      // console.log("顶级账户", data);
      this.tableData = data.list;
      if (this.pagination == 0) return (this.pagination = data.total);
    },

    toDetail(address) {
      console.log(address);
      this.$router.push({ path: "/address_detail", query: { address } });
    },
  },
  watch: {
    tableData(value) {
      if (Array.isArray(value)) {
        this.loading = this.tableData.length === 0 ? true : false;
      } else {
        this.loading = false;
      }
    },
    deep: true,
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
  },
};
</script>
<style lang="scss" scoped>
h3 {
  width: 1280px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  font-size: 20px;
  color: rgba(20, 37, 62, 0.85);
  letter-spacing: 0;
}

.main {
  width: 1280px;
  margin: 0 auto 80px;
  // padding: 15px;
  height: 732px;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;

  .table_title {
    font-weight: bold;
    font-size: 12px;
    color: rgba(20, 37, 62, 0.85);
    padding-left: 16px;
    height: 60px;
    line-height: 60px;
    span {
      color: #5671f2;
      margin: 0 3px;
    }
  }
  .table_body {
    overflow: auto;
    > div {
      min-width: 1200px;
    }
  }
}

@media screen and (max-width: 598px) {
  h3 {
    width: 100%;
    padding-left: 16px;
  }
  .main {
    width: 100%;
  }
}
</style>
