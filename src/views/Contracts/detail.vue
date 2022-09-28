<template>
  <div>
    <div class="PageStructure">
      <BasicTitle :title="languagePack.contracttext11">
        <template #message>
          <div class="basicStyle messageBasic">
            <div class="column">
              <p>{{ languagePack.contracttext12 }}：</p>
              <span>{{ contractData.contract_address }} <img src="@/assets/img/copy.png" @click="Copy(contractData.contract_address )" style='cursor: pointer;'/></span>
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext18 }}：</p>
              <span>N/A</span>
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext13 }}：</p>
              <span>{{ contractData.contract_lable }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext19 }}：</p>
              <span>0 GHM</span>
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext14 }}：</p>
              <span>{{ contractData.contract_id }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext20 }}：</p>
              <span>0.000%</span>
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext15 }}：</p>
              <!-- <span>0x9BF4001d307dFd62B26A2F1307ee0C0307632d59</span> -->
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext21 }}：</p>
              <span>{{ contractData.compute_count }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext16 }}：</p>
              <!-- <span>FA824C4504F21FC59250DA0CDF549DD392FD862BAF2689D246A07B9E941F04A9</span> -->
            </div>
            <div class="column">
              <p>{{ languagePack.contracttext22 }}：</p>
              <span>0 GHM</span>
            </div>
            <!-- <div class="column">
              <p>{{ languagePack.constructor }}：</p>
              <span>无</span>
            </div> -->
          </div>
        </template>
      </BasicTitle>

      <div class="contracts_table">
        <div class="contracts_table_title">
          {{ languagePack.contracttext23 }} {{ languagePack.contracttext24
          }}<span> {{ txtotal }} </span>{{languagePack.contracttext33}}
        </div>
        <el-table
          height="612px"
          :data="tableList"
          style="width: 100%"
          :header-cell-class-name="'tableHeaderCellStyle'"
          :row-class-name="'tableRowStyle'"
          :row-style="{ height: '58px' }"
          v-loading="loading"
        >
        <div slot="empty">{{languagePack.prompttext11}}</div>
          <el-table-column
            prop="ID"
            :label="languagePack.contracttext25"
            width="560"
          >
            <template slot-scope="scope">
              <div class="specialFont" @click="toaddress(scope.row.sender)">
                {{ scope.row.sender }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="languagePack.contracttext26" width="420">
            <template slot-scope="scope">
              <p>
                {{ dealwithTime(scope.row.timestamp )}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="languagePack.contracttext27"
            width="200"
          >
            <template slot-scope="scope">
              <div class="stateColumn">
                <div
                  :style="{
                    width: '6px',
                    height: '6px',
                    borderRadius: '6px',
                    marginRight: '6px',
                    background:
                      scope.row.result == 'success' ? '#55C499' : '#ED422B',
                  }"
                />
                <span v-if="scope.row.result === 'success'">{{languagePack.prompttext02}}</span>
                <span v-else>{{languagePack.prompttext03}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="languagePack.contracttext31" align="center">
            <template slot-scope="scope">
              <div class="tableDetail" @click="tohash(scope.$index)">
                {{ languagePack.contracttext28 }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <el-pagination
            popper-class="popperSelect"
            small
            :page-sizes="[10, 25, 50]"
            :page-size="page.pageSize"
            layout="prev, pager, next, sizes"
            :total="txtotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins";
import { getContractInfo, getContractTx } from "@/api/contract.js";
export default {
  mixins: [mixins],
  data() {
    return {
      loading: true,
      tableList: [],
      contractData: {},
      pageSize: 10,
      page: 0,
      txtotal: 0,
      hashList: [],
    };
  },
  created() {
    this.queryContract();
    this.queryTx(this.pageSize, this.page);
  },
  methods: {
    async queryContract() {
      const address = this.$route.query.address;
      const res = await getContractInfo(address);
      console.log("合约详细信息", res);
      this.contractData = res.data;
    },
    async queryTx(pageSize, page) {
      const address = this.$route.query.address;
      const txlist = await getContractTx(pageSize, page, address);
      console.log(txlist);
      let arr = txlist.data.list
      if(Array.isArray(arr)){
        this.tableList = arr
        this.hashList = this.tableList.map((item) => {
          return { hash: item._id, status: item.result };
        });
      }
      this.tableList = arr

      if (this.txtotal !== 0) return;
      this.txtotal = txlist.data.total;
    },
    handleSizeChange(val) {
      this.tableList = [];
      this.queryTx((this.pageSize = val), (this.page = 0));
    },
    handleCurrentChange(index) {
      this.page = index - 1;
      this.tableList = [];
      this.queryTx(this.pageSize, this.page);
    },
    tohash(index) {
      sessionStorage.setItem('hashList',JSON.stringify({hashList:this.hashList,index}))
      this.$router.push({
        name: "hash_detail",
      });
    },
    toaddress(address) {
      this.$router.push({ path: "/address_detail", query: { address } });
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
    basicData() {
      const {
        contractinformation,
        contractaddress,
        nametag,
        contractnumber,
        developer,
        datahash,
        constructor,
        sourcecode,
        contractbalance,
        thepercentageoflockedpositions,
        Totalnumberofoperations,
        totalvalueoflockedposition,
      } = this.languagePack;
      return;
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
  },
};
</script>

<style lang="scss" scoped>
.PageStructure {
  margin-top: 24px;
  margin-bottom: 80px;
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

.contracts_table {
  margin-top: 16px;
  width: 1280px;
  background: #ffffff;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;

  &_title {
    height: 60px;
    padding-left: 16px;
    font-size: 14px;
    color: rgba(20, 37, 62, 0.85);
    font-weight: bold;
    line-height: 60px;
  }
}

.table_bottom {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.stateColumn {
  display: flex;
  align-items: center;
}

.tableDetail {
  font-weight: bold;
  font-size: 12px;
  color: #5671f2;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

@media screen and (max-width: 598px) {
  .PageStructure {
    width: 100%;
  }

  .contracts_table {
    width: 100%;
  }

  .basicStyle {
    display: flex !important;
    .column {
      width: 100%;
      > p {
        width: auto;
      }
    }
  }
}
</style>
