<template>
  <div>
    <h3>{{ languagePack.txstext01 }}</h3>
    <main class="main">
      <el-row
        type="flex"
        class="total_title"
        align="middle"
        justify="space-between"
      >
        <div>
          {{languagePack.txstext02}}<span class="block_num">{{ totalNumber }}</span
          >{{languagePack.txstext19}} ( {{ languagePack.txstext03 }} )
        </div>
        <el-pagination
          popper-class="popperSelect"
          small
          :current-page="page.currentPage + 1"
          @current-change="handleCurrentChange"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="totalNumber"
          :pager-count="5"
        >
        </el-pagination>
      </el-row>
      <el-table
        :data="tableData"
        size="mini"
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
                trigger="manual"
                v-model="scope.row.eyePopover"
              >
                <div class="popoverBox">
                  <div class="popoverBox_content">
                    <div style="height:28px;line-height:28px;">
                      {{ languagePack.txstext13 }}
                    </div>
                    <div class="popStatus">
                      <div v-if="scope.row.result == 'success'">
                        <img src="@/assets/img/deal_succeed@2x.png" /><span
                          >{{languagePack.prompttext02}}</span
                        ><span></span>
                      </div>
                      <div v-else>
                        <img src="@/assets/img/deal_lose@2x.png" /><span
                          >{{languagePack.prompttext03}}</span
                        ><span></span>
                      </div>

                      <el-divider></el-divider>
                    </div>
                    <div
                      v-for="(item, index) in statusTitle"
                      :key="index"
                    >
                      <div style="height:28px;line-height:28px;">{{ item.title }}</div>
                      <span v-show="index === 0"
                        >{{ scope.row.fee/1e6 }} GHM ($0.00)</span
                      >
                      <span v-show="index === 1"
                        >{{ scope.row.gas_wanted | toMoney }}Gas总量中实际消耗{{
                          scope.row.gas_used | toMoney
                        }}Gas<br /> {{(scope.row.gas_used*scope.row.fee/scope.row.gas_wanted/1e6).toFixed(6)}}GHM </span> <!---->
                      <span v-show="index === 2">{{scope.row.sequence}}</span>

                      <el-divider></el-divider>
                    </div>
                  </div>
                  <div class="detailBox" @click="queryTxDetail(scope.$index)">
                    {{languagePack.prompttext10}}
                  </div>
                </div>
                <img slot="reference" @focus="scope.row.eyePopover = true" @blur="scope.row.eyePopover = false" width="14" src="@/assets/img/table_eye_nor@2x.png" />
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="_id"
          :label="languagePack.txstext04"
          width="180px"
        >
          <template slot-scope="scope">
            <div class="specialFont" @click="queryTxDetail(scope.$index)">
              <el-tooltip
                effect="dark"
                :content="languagePack.prompttext05"
                placement="top"
              >
                <img
                  src="@/assets/img/table_mistake@2x.png"
                  v-if="scope.row.result === 'error'"
                  width="14"
                  @click.stop
                />
              </el-tooltip>
              {{ scope.row._id | sliceAddress }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="languagePack.txstext05"
          width="220px"
          align="center"
        >
          <template slot-scope="scope">
            <span class="table_txOperate">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.txstext06">
          <template slot-scope="scope">
            <div class="specialFont" @click="toBlock(scope.row.height)">
              {{ scope.row.height }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.txstext07">
          <template slot-scope="scope">
            <div>{{ TimeStamp(scope.row.timestamp) }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.txstext08" width="150px">
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
                src="@/assets/img/table_transmit@2x.png"
                width="20"
                alt=""
                v-if="scope.row.result !== 'error'"
              />
              <span v-else class="table_txfail">self</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="languagePack.txstext09"
          width="150px"
        >
          <template slot-scope="scope">
            <TableTooltip v-if="scope.row.targetAddress"
              :content="scope.row.targetAddress"
              @click.native="toAddress(scope.row.targetAddress)"
            ></TableTooltip>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.txstext10">
          <template slot-scope="scope">
            <div><!-- style="white-space: nowrap"-->
              {{ scope.row.tx_amount}} GHM
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="languagePack.txstext11" min-width="90px" align="center">
          <template slot-scope="scope">
            <div>{{ (scope.row.fee/1e6)}}</div>
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
          :pager-count="5"
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
  mounted() {
    
  },
  methods: {
    handleSizeChange(val) {
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
      let { data:{list,total} } = await queryTxList(limit, index);
      // console.log("交易", list);
      let arr = []
      this.hashList = []
      list.forEach((item)=>{
        if(item.code) return
        let {tx_response:{txhash,height,timestamp,gas_used,gas_wanted,logs,events},tx:{auth_info,body:{messages}}} = item
        let {amount,from_address,to_address,delegator_address,validator_address,withdraw_address,sender,contract,validator_addr} = messages[0]
        let type = messages[0]['@type'].split('.').pop()
        let reward;
        if(type === 'MsgWithdrawDelegatorReward'){
          reward = logs[0].events.pop().attributes[0].value.replace(/[a-zA-Z]/g, "")
        }
        // let status = 
        
        let statusArr = events.map((e) => {
            return e.attributes.map((i) => {
                return i.index;
            }); 
        });
        let result = statusArr.flat().includes(false)?'error':'success'
        arr.push({
          _id:txhash,
          type,
          height,
          timestamp,
          sender:from_address || delegator_address || sender || validator_addr || messages[0].inputs[0].address,
          targetAddress:to_address || validator_address || withdraw_address || contract,
          tx_amount:(type === 'MsgWithdrawDelegatorReward'?reward:amount?amount.amount?amount.amount:amount[0].amount:type === 'MsgMultiSend'?messages[0].outputs[0].coins[0].amount:0)/1e6,
          fee:auth_info.fee.amount[0].amount,
          result,
          gas_used,
          gas_wanted,
          sequence:auth_info.signer_infos[0].sequence,
          eyePopover:false
        })
        this.hashList.push({
          hash: txhash, type: type, status:result
        }) 
      })
      this.tableData = arr;
      this.totalNumber = total;
      //   this.tableData = data.list;
        // this.page.total = total;
    },
    queryTxDetail(index) {
      sessionStorage.setItem('hashList',JSON.stringify({hashList:this.hashList,index}))
      // console.log(this.hashList, index);
      this.$router.push({name: "hash_detail"});
    },
    toAddress(address) {
      if(address.includes('valoper')){
        return this.$router.push({path:'/node_detail',query:{address}})
      }
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
        { title: this.languagePack.txstext11 + ":" },
        { title: this.languagePack.txstext15 + ":" },
        { title: this.languagePack.txstext17 + ":" },
      ];
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
};
</script>
<style lang="scss" scoped>
.main {
  width: 1280px;
  min-height: 732px;
  margin: 0 auto 80px;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;

  .el-table{
    min-height: 612px;
  }
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
  width: auto;
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

@media screen and (max-width: 598px) {
  h3 {
    width: 100%;
    text-indent: 16px;
  }
  .main {
    width: 100%;
    overflow: hidden;
    .total_title {
      width: 1280px;
    }
    .el-row--flex.is-justify-end {
      justify-content: center;
    }
  }
}

</style>
