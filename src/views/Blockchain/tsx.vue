<template>
  <div>
    <h3>{{ languagePack.transactions }}</h3>
    <main class="main">
      <el-row
        type="flex"
        class="total_title"
        align="middle"
        justify="space-between"
      >
        <div>
          总共寻获超过><span class="block_num">{{ totalNumber }}</span
          >条交易（仅显示最新500K记录）
        </div>
        <el-pagination
          popper-class="popperSelect"
          small
          :current-page="page.currentPage + 1"
          @current-change="handleCurrentChange"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="totalNumber"
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
        <el-table-column width="48">
          <template slot-scope="scope">
            <div class="tableEyeBackground">
              <el-popover
                placement="right-start"
                :offset="50"
                :visible-arrow="true"
                width="300px"
                trigger="click"
              >
                <div class="popoverBox">
                  <div class="popoverBox_content">
                    <div>
                      {{ languagePack.Txstatus }}
                    </div>
                    <div class="popStatus">
                      <div v-if="scope.row.result == 'success'">
                        <img src="@/assets/img/deal_succeed@2x.png" /><span
                          >成功</span
                        ><span>(X个区块确认)</span>
                      </div>
                      <div v-else>
                        <img src="@/assets/img/deal_lose@2x.png" /><span
                          >失败</span
                        ><span>(X个区块确认)</span>
                      </div>

                      <el-divider></el-divider>
                    </div>
                    <div v-for="(item, index) in [...statusTitle,{title:'随机数'}]" :key="index">
                      <div>{{ item.title }}</div>
                      <span v-show="index === 0"
                        >{{ scope.row.fee | toMoney }} GHM ($0.00)</span
                      >
                      <span v-show="index === 1"
                        >{{ scope.row.gas_wanted | toMoney }}Gas总量中实际消耗{{
                          scope.row.gas_used | toMoney
                        }}Gas<br />@0.0004GHM</span
                      >
                      <span v-show="index === 2">{{ scope.row.sequence }}</span>
                      
                      <el-divider></el-divider>
                    </div>
                  </div>
                  <div
                    class="detailBox"
                    @click="queryDealtoHash(scope.row.txhash)"
                  >
                    查看详情
                  </div>
                </div>
                <img
                  slot="reference"
                  src="@/assets/img/table_eye_nor.png"
                  style="vertical-align: middle"
                />
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="_id"
          :label="languagePack.transactionhash"
          width="180px"
        >
          <template slot-scope="scope">
            <div class="specialFont" @click="queryTxDetail(scope.$index)">
              <el-tooltip effect="dark" content="交易失败" placement="top">
                <img
                  src="@/assets/img/table_mistake.png"
                  v-if="scope.row.result === 'error'"
                  @click.stop
                />
              </el-tooltip>
              {{ scope.row._id | sliceAddress }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="languagePack.Method"
          width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="table_txOperate">{{ scope.row.type }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.BlockHeight">
          <template slot-scope="scope">
            <div class="specialFont" @click="toBlock(scope.row.height)">{{ scope.row.height }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="timestamp" :label="languagePack.TimeStamp">
          <template slot-scope="scope">
            <div>{{ scope.row.timestamp | jetlag }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="languagePack.Sender"
          :show-overflow-tooltip="true"
          width="150px"
        >
          <template slot-scope="scope">
            <TableTooltip
              :content="scope.row.sender"
              @click.native="toAddress(scope.row.sender)"
            ></TableTooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" width="56px">
          <template slot-scope="scope">
            <div>
              <img
                src="@/assets/img/table_transmit.png"
                alt=""
                v-if="scope.row.result !== 'error'"
              />
              <span v-else class="table_txfail">self</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fuelTotal"
          :label="languagePack.Recipient"
          width="150px"
        >
          <template slot-scope="scope">
            <TableTooltip
              :content="scope.row.targetAddress"
              @click.native="toAddress(scope.row.targetAddress)"
            ></TableTooltip>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.turnover">
          <template slot-scope="scope">
            <div>
              {{ scope.row.tx_amount | toMoney
              }}<span v-if="!isNaN(scope.row.tx_amount)"> GHM</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.TransactionFee">
          <template slot-scope="scope">
            <div>{{ scope.row.fee | toMoney }}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="height: 60px" align="middle">
        <el-pagination
          popper-class="popperSelect"
          small
          @size-change="handleSizeChange"
          :current-page="page.currentPage + 1"
          @current-change="handleCurrentChange"
          :page-sizes="[50, 100]"
          :page-size="page.pageSize"
          layout="prev, pager, next, sizes"
          :total="totalNumber"
        >
        </el-pagination>
      </el-row>
    </main>
  </div>
</template>

<script>
import { queryTxList } from "@/api/blockchain";
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      tableData: [], // 表格数据
      page: {
        pageSize: 50,
        currentPage: 0,
      },
      totalNumber: 0,
      loading: true,
      hashList: [],
    };
  },
  created() {
    let { pageSize, currentPage } = this.page;
    this.getData(pageSize, currentPage);
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      let oul = document.querySelectorAll(".el-select-dropdown__list li");
      oul.forEach((item) => {
        console.log(item.style.color);
        item.style.color = "";
      });
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

    showDetail() {
      let obtn = document.querySelectorAll(".el-button");
      // console.log('obtn', obtn);
      // obtn.forEach(item => item.style.backgroundColor = '#fff')
    },

    async getData(limit, index) {
      let { data } = await queryTxList(limit, index);
      console.log("交易", data);
      let arr = data.list;

      //为数组添加type属性
      this.disposeTableType(arr);
      this.hashList = arr.map((item) => {
        return { hash: item._id, type: item.type, status: item.result };
      });
      // console.log(this.hashList);
      this.tableData = arr;
      this.totalNumber = data.total;
      //   this.tableData = data.list;
      //   this.page.total = data.total;
    },
    queryTxDetail(index) {
      console.log(this.hashList, index);
      this.$router.push({
        name: "hash_detail",
        params: { hash: this.hashList, index },
      });
      // console.log(index);
    },
    toAddress(address) {
      this.$router.push({ path: "/address_detail", query: { address } });
    },
    toBlock(height) {
      this.$router.push({ path: "/block_detail", query: { height } });
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    statusTitle() {
      return [
        { title: this.languagePack.TransactionFee + ":" },
        { title: this.languagePack.GasInformation + ":" },
        { title: this.languagePack.GasUsed + ":" },
      ];
    },
  },
  watch: {
    tableData(value) {
      this.loading = value.length == 0 ? true : false;
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 1280px;
  height: 732px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;

  .total_title {
    height: 60px;
    padding-left: 16px;
    font-weight: bold;
    font-size: 12px;
    color: rgba(20, 37, 62, 0.85);

    .block_num {
      font-size: 12px;
      color: #5671f2;
      margin: 0 5px;
    }
  }

  .table_box {
    .tranHashText {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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

.table_txHash {
  position: relative;
  white-space: nowrap;
  text-align: left;
  width: 180px;
  > img {
    left: 0;
  }
}
.table_txOperate {
  height: 20px;
  line-height: 20px;
  background: #f8f9fa;
  border: 1px solid #e9eaef;
  border-radius: 2px;
}

.table_txfail {
  width: 29px;
  height: 16px;
  background: #f8f9fa;
  border: 1px solid #e9eaef;
  border-radius: 2px;
  padding: 0 4px;
  white-space: nowrap;
}
</style>
