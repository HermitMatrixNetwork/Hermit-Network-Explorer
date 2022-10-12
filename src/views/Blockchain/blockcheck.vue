<template>
  <div>
    <h3>{{ languagePack.blocktext01 }}</h3>
    <main class="main">
      <el-row
        type="flex"
        class="total_title"
        align="middle"
        justify="space-between"
      >
        <div>
          {{languagePack.blocktext02}}<span class="block_num">{{ blockTotal }}</span
          >{{languagePack.blocktext04}}
        </div>
        <el-pagination
          popper-class="popperSelect"
          small
          :current-page="page.currentPage + 1"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="page.pageSize"
          :total="blockTotal"
          hide-on-single-page
          :pager-count="5"
        >
        </el-pagination>
      </el-row>
      <el-table
        :data="tableData"
        size="mini"
        height="612px"
        :header-cell-class-name="'tableHeaderCellStyle'"
        :row-class-name="'tableRowStyle'"
        :row-style="{ height: '58px !important' }"
        v-loading="loading"
      >
        <el-table-column
          prop="_id"
          :label="languagePack.blocktext01"
          width="80px"
        >
          <template slot-scope="scope">
            <div class="specialFont" @click="toBlockDetail(scope.row._id)">
              {{ scope.row._id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.blocktext05" width="150px">
          <template slot-scope="scope">
            <div>{{ TimeStamp(scope.row.timestamp) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tx_count"
          :label="languagePack.blocktext06"
          width="120px"
          align="right"
        />
        <el-table-column :label="languagePack.blocktext07" width="160">
          <template slot-scope="scope">
            <div  @click="toNode(scope.row.proposer_address)" class="specialFont">{{scope.row.proposer_address | sliceAddress}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gas_used"
          :label="languagePack.blocktext08"
          width="228px"
        >
          <template slot-scope="scope">
            <p style="line-height:16px;color: #86909C;">{{scope.row.gas_used | toMoney}}
                <span style="color:#86909C45"> ( {{percentage(scope.row.gas_used,scope.row.gas_total)}} %)</span>            
            </p>
            <el-progress
              :percentage="percentage(scope.row.gas_used,scope.row.gas_total)"
              :width="196"
              :stroke-width="6"
              color="#1E42EDFF"
              :show-text="false"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          prop="gas_total"
          :label="languagePack.blocktext09"
          align="right"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.gas_total | toMoney }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="languagePack.blocktext10"
          width="250px"
          align="right"
        >
        <template slot-scope="scope">
          <div>{{scope.row.coinbase?(scope.row.coinbase.replace(/[a-z]/g,''))/1e6:0}}</div>
        </template>
      </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          popper-class="popperSelect"
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage + 1"
          :page-sizes="[50, 100]"
          :page-size="page.pageSize"
          layout="prev, pager, next, sizes"
          :total="blockTotal"
          hide-on-single-page
          :pager-count="5"

        >
        </el-pagination>
      </el-row>
    </main>
  </div>
</template>

<script>
import { queryBlockList } from "@/api/blockchain";
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      blockTotal: 0,
      tableData: [],
      page: {
        pageSize: 50,
        currentPage: 0,
      },
      loading: true,
      timer: "",
      nodes:JSON.parse(sessionStorage.getItem('node'))
    };
  },
  created() {
    let { pageSize, currentPage } = this.page;
    this.getBlockData(pageSize, currentPage);
    // this.timer = setInterval(()=>this.getBlockData(this.page.pageSize, this.page.currentPage),3000)
  },
  mounted() {
    // document.querySelector(".selected").style.color = "#1E42ED";
  },
  methods: {
    // 获取区块数据
    async getBlockData(limit, index) {
      let { data } = await queryBlockList(limit, index);
      console.log("区块数据", data);
      this.tableData = data.list;
      this.blockTotal = data.total;
    },
    handleSizeChange(val) {
      this.tableData = [];
      this.getBlockData(
        (this.page.pageSize = val),
        (this.page.currentPage = 0)
      );
    },
    handleCurrentChange(index) {
      this.page.currentPage = index - 1;
      let { pageSize, currentPage } = this.page;
      this.tableData = [];
      this.getBlockData(pageSize, currentPage);
    },
    toBlockDetail(height) {
      this.$router.push({
        path: "/block_detail",
        query: { height },
      });
    },
    toNode(val) {
      // console.log(val);
      // console.log(this.nodes);
      let address = this.nodes.find(e=>val === e.consen_addr_hex).operator_address
      // console.log(address);
      this.$router.push({ name: "node_detail", query: { address } });
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
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    percentage(){
      return function(use,total){
        if(isNaN(use/total)){
          return 0
        }else{
          return Number(((use/total)*100).toFixed(2))
        }
      }
    },
    
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1280px;
  height: 732px;
  margin: 0 auto 80px;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;

  .total_title {
    font-weight: bold;
    height: 60px;
    font-size: 12px;
    color: rgba(20, 37, 62, 0.85);
    padding-left: 16px;

    .block_num {
      font-weight: bold;
      font-size: 12px;
      color: #5671f2;
      margin: 0 5px;
    }
  }
}
h3 {
  width: 1280px;
  height: 60px;
  line-height: 60px;
  margin: auto;
  font-size: 20px;
  color: rgba(20, 37, 62, 0.85);
}

::v-deep th {
  background-color: #f8f9fa !important;
}

::v-deep .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
  // border-color: #1E42ED !important;

  &:hover {
    color: #1e42ed !important;
    border-color: #1e42ed !important;
  }
}

::v-deep .el-progress {
  display: flex !important;
  flex-direction: column-reverse !important;
}

::v-deep .el-progress__text {
  margin-left: 0;
  margin-bottom: 4px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px !important;
  color: rgba(20, 37, 62, 0.85);
}

::v-deep .el-progress-bar__outer {
  width: 196px;
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
