<template>
  <div class="main">
    <div class="block_title">
      {{ languagePack.blocktext11 }} ：#{{ commitHeight }}
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
      <BasicTitle :title="languagePack.blocktext12">
        <template #message>
          <div class="basicStyle messageBasic">
            <div class="column">
              <p>{{ languagePack.blocktext13 }}：</p>
              <span>{{ commitHeight }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.blocktext17 }}：</p>
              <span style="color:#5671F2;cursor: pointer;" @click="nextData(-1)">{{ blockData.parent_hash }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.blocktext14 }}：</p>
              <span>{{ blockData.timestamp | timeStamp }} +UTC</span>
            </div>
            <div class="column">
              <p>{{ languagePack.blocktext18 }}：</p>
              <span style="color:#5671F2;cursor: pointer;" @click="queryDealtoNode(blockData.validator)">{{ blockData.proposer_address }}</span>
            </div>

            <div class="column">
              <p>{{ languagePack.blocktext15 }}：</p>
              <span>{{ blockData.tx_count }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.blocktext19 }}：</p>
              <span>{{ blockData.gas_used }}<span style="color:#86909C45" v-if="blockData.gas_total"> ({{(blockData.gas_used/blockData.gas_total*100).toFixed(2)}} %)</span></span>
            </div>
            <div class="column">
              <p>{{ languagePack.blocktext16 }}：</p>
              <span>{{ blockData.hash }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.blocktext20 }}：</p>
              <span>{{ blockData.gas_total }}</span>
            </div>
          </div>
        </template>
      </BasicTitle>
    </div>

    <div class="block_detail">
      <div class="block_detail_title">{{ languagePack.blocktext21 }}</div>
      <div class="table_body">
        <el-table
          :data="tableData"
          size="mini"
          :header-cell-class-name="'tableHeaderCellStyle'"
          :row-class-name="'tableRowStyle'"
          :row-style="{ height: '58px !important' }"
          v-loading="loading"
        >
        <div slot="empty">{{languagePack.prompttext11}}</div>
          <el-table-column :label="languagePack.blocktext22">
            <template slot-scope="scope">
              <div
                class="specialFont"
                @click="
                  queryDealtoHash({
                    hash: scope.row._id,
                    status: scope.row.result,
                  })
                "
              >
                <el-tooltip effect="dark" :content="languagePack.prompttext05" placement="top">
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
            :label="languagePack.blocktext23"
            width="110px"
            align="center"
          >
            <template slot-scope="scope">
              <div class="table_txOperate">{{ scope.row.type }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="languagePack.blocktext24">
            <template slot-scope="scope">
              <div>{{ scope.row.height }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="timestamp" :label="languagePack.blocktext25">
            <template slot-scope="scope">
              <div>{{ scope.row.timestamp | jetlag }}</div>
            </template>
          </el-table-column>
          <el-table-column
            :label="languagePack.blocktext26"
            :show-overflow-tooltip="true"
            width="150px"
          >
            <template slot-scope="scope">
              <TableTooltip
                :content="scope.row.sender"
                @click.native="queryDealtoAddress(scope.row.sender)"
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
            :label="languagePack.blocktext27"
            width="150px"
          >
            <template slot-scope="scope">
              <TableTooltip
                :content="scope.row.targetAddress"
                @click.native="queryDealtoAddress(scope.row.targetAddress)"
              ></TableTooltip>
            </template>
          </el-table-column>
          <el-table-column :label="languagePack.blocktext28">
            <template slot-scope="scope">
              <div>
                {{ scope.row.tx_amount /1e6
                }}<span v-if="!isNaN(scope.row.tx_amount)"> GHM</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="languagePack.blocktext29">
            <template slot-scope="scope">
              <div>{{ scope.row.fee / 1e6 }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          popper-class="popperSelect"
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 25, 50]"
          :page-size="10"
          layout="prev, pager, next, sizes"
          :total="tableData ? tableData.length : 0"
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
      page: {
        currentPage: 0,
        pageSize: 10,
      },
      blockData: {},
      loading: true,
      waitResult: false,
    };
  },
  created() {
    this.commitHeight = this.blockHight = this.$route.query.height;
    this.getblockDetail(this.commitHeight);
  },
  mounted() {},
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
    },

    handleSizeChange(val) {},
    handleCurrentChange(index) {},
    nextData(num) {
      this.waitResult = true;
      let number = (this.blockHight = this.blockHight * 1);
      this.blockHight += num;
      this.getblockDetail(this.blockHight).then((res) => {
        if (res) {
          this.commitHeight = this.blockHight;
          this.$router.replace({ query: { height: this.blockHight } });
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
    "$route.query"(val) {
      if (val.status) {
        this.commitHeight = this.blockHight = val.height;
        this.getblockDetail(this.commitHeight);
      }
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
    margin: 16px 0 80px;
    width: 1280px;
    // height: 732px;
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
    .table_body{
      overflow: auto;
      >div{
        min-width: 1200px;
      }
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
