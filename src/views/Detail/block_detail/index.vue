<template>
  <div class="main">
    <div class="block_title">
      {{ languagePack.block }} ：#{{ commitHeight }}
      <div class="nextBtn">
        <span
          @click="nextData(-1)"
          :style="{ cursor: waitResult ? 'wait' : 'pointer' }"
          ><i class="el-icon-arrow-left"></i
        ></span>
        <span
          @click="nextData(1)"
          :style="{ cursor: waitResult ? 'wait' : 'pointer' }"
          ><i class="el-icon-arrow-right"></i
        ></span>
      </div>
    </div>
    <div class="block_basic">
      <BasicTitle :title="languagePack.details">
        <template #message>
          <div class="basicStyle messageBasic">
            <div class="column">
              <p>{{ languagePack.blockheight }}：</p>
              <span>{{ commitHeight }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.parentblockhash }}：</p>
              <span>{{ blockData.parent_hash }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.TimeStamp }}：</p>
              <span>{{ blockData.timestamp | timeStamp }} +UTC</span>
            </div>
            <div class="column">
              <p>{{ languagePack.proposer }}：</p>
              <span>{{ blockData.proposer_address }}</span>
            </div>

            <div class="column">
              <p>{{ languagePack.Amount }}：</p>
              <span>{{ blockData.tx_count }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.GasUsed }}：</p>
              <span>{{ blockData.gas_used }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.blockhash }}：</p>
              <span>{{ blockData.hash }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.GasLimit }}：</p>
              <span>{{ blockData.gas_total }}</span>
            </div>
          </div>
        </template>
      </BasicTitle>
    </div>

    <div class="block_detail">
      <div class="block_detail_title">交易</div>
      <el-table
        :data="tableData"
        size="mini"
        height="612px"
        :header-cell-class-name="'tableHeaderCellStyle'"
        :row-class-name="'tableRowStyle'"
        v-loading="loading"
      >
        <el-table-column :label="languagePack.transactionhash">
          <template slot-scope="scope">
            <div class="specialFont">
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
          prop="operationType"
          :label="languagePack.operationtype"
          width="100px"
          align="center"
        >
          <template slot-scope="scope">
            <div class="table_txOperate">{{ scope.row.type }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.blockheight">
          <template slot-scope="scope">
            <div class="specialFont">{{ scope.row.height }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="timestamp" :label="languagePack.time">
          <template slot-scope="scope">
            <div>{{ scope.row.timestamp | jetlag }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="languagePack.startaddress"
          :show-overflow-tooltip="true"
          width="150px"
        >
          <template slot-scope="scope">
            <TableTooltip :content="scope.row.sender"></TableTooltip>
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
          :label="languagePack.targetaddress"
          width="150px"
        >
          <template slot-scope="scope">
            <TableTooltip :content="scope.row.targetAddress"></TableTooltip>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.transactionnumericalvalue">
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
      <el-row type="flex" justify="end">
        <el-pagination
          popper-class="popperSelect"
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 25, 50]"
          :page-size="10"
          layout="prev, pager, next, sizes"
          :total="100"
        >
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import { queryBlockdetails } from "@/api/blockchain.js";
import mixins from "@/mixins";
import moment from "moment";
export default {
  mixins: [mixins],
  data() {
    return {
      block: "",
      commitHeight: 0,
      blockHight: 0,
      tableData: [],
      currentPage: 1,
      blockData: {},
      loading: true,
      waitResult: false,
    };
  },
  created() {
    this.commitHeight = this.blockHight = this.$route.query.height;
    this.getblockDetail(this.commitHeight);
  },
  mounted() {
    document.querySelector(".selected").style.color = "#1E42ED";
  },
  methods: {
    async getblockDetail(value) {
      const res = await queryBlockdetails(value * 1);
      console.log("区块信息", res);

      if (!res.data.block) {
        this.messageBox("暂未出块", "error");
        return false;
      }
      this.blockData = res.data.block;
      let arr = res.data.txs;
      this.disposeTableType(arr);
      this.tableData = arr;

      return true;
      // console.log(this.tableData);
    },

    handleSizeChange() {
      let oul = document.querySelectorAll(".el-select-dropdown__list li");
      oul.forEach((item) => (item.style.color = ""));
      let oli = document.querySelector(".selected");
      oli.style.color = "#606266";
      document.querySelector(".hover").style.color = "#1E42ED";
    },

    handleCurrentChange() {
      console.log("11");
    },
    nextData(num) {
      this.waitResult = true;
      let number = (this.blockHight = this.blockHight * 1);
      this.blockHight += num;
      this.getblockDetail(this.blockHight).then((res) => {
        if (res) {
          this.commitHeight = this.blockHight;
          this.$router.push({ query: { height: this.blockHight } });
        } else {
          this.blockHight = number;
        }
        this.waitResult = false;
      });
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
  },
  watch: {
    tableData(value) {
      if (!Array.isArray(value)) return (this.loading = false);
      this.loading = value.length == 0 ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1280px;
  margin: 0 auto;

  .block_title {
    padding: 16px 0;
    font-weight: 500;
    font-size: 20px;
    color: rgba(20, 37, 62, 0.85);
    letter-spacing: 0;
    position: relative;
  }

  .block_basic {
    width: 1280px;
    // height: 252px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    &_title {
      width: 1280px;
      height: 52px;
      line-height: 52px;
      box-shadow: inset 0 -1px 0 0 #e9eaef;
      padding-left: 16px;
    }
    &_content {
      height: 200px;
      padding: 0 16px;
      padding-top: 16px;
      display: flex;
      flex-wrap: wrap;
      align-content: stretch;
      justify-content: flex-start;
      &_item {
        width: 620px;
        height: 28px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(20, 37, 62, 0.85);
        span {
          padding-left: 52px;
          height: 28px;
          line-height: 28px;
        }
      }
    }
  }

  .block_detail {
    margin-top: 16px;
    width: 1280px;
    height: 732px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    &_title {
      height: 60px;
      line-height: 60px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 14px;
      color: rgba(20, 37, 62, 0.85);
      letter-spacing: 0;
      padding-left: 16px;
    }
  }
}

.nextBtn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  > span {
    background: #ffffff;
    border: 1px solid #e9eaef;
    border-radius: 2px;
    font-size: 12px;
    padding: 5px 7px;
    margin: 0 4px;
  }
}

@media screen and (max-width: 598px) {
  .main {
    width: 100%;
    > div {
      width: 100%;
    }
    .block_title {
      width: 100%;
      text-indent: 16px;
    }
    .block_basic {
      width: 100% !important;

      .block_basic_content {
        padding: 12px;
        height: auto;
      }
    }
    .block_detail {
      width: 100%;
    }
  }

  .basicStyle {
    display: flex !important;
    .column {
      width: 100% !important;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      > p {
        width: auto;
      }
    }
  }
}

.basicStyle {
  width: 100%;
  display: grid;
  grid: 28px / auto auto;
  grid-gap: 16px;
  padding-bottom: 8px;
  justify-content: normal;
  .column {
    height: 28px;
    width: 600px;
    white-space: nowrap;
  }
}
</style>
