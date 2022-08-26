<template>
  <div>
    <div class="PageStructure">
      <BasicTitle :title="languagePack.contractinformation">
        <template #message>
          <div class="basicStyle messageBasic">
            <div class="column">
              <p>{{ languagePack.contractaddress }}：</p>
              <span>{{ contractData.contract_address }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.sourcecode }}：</p>
              <span>N/A</span>
            </div>
            <div class="column">
              <p>{{ languagePack.nametag }}：</p>
              <span>{{ contractData.contract_lable }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.contractbalance }}：</p>
              <span>0 GHM</span>
            </div>
            <div class="column">
              <p>{{ languagePack.contractnumber }}：</p>
              <span>354</span>
            </div>
            <div class="column">
              <p>{{ languagePack.thepercentageoflockedpositions }}：</p>
              <span>0.000%</span>
            </div>
            <div class="column">
              <p>{{ languagePack.developer }}：</p>
              <span>0x9BF4001d307dFd62B26A2F1307ee0C0307632d59</span>
            </div>
            <div class="column">
              <p>{{ languagePack.Totalnumberofoperations }}：</p>
              <span>{{ contractData.compute_count }}</span>
            </div>
            <div class="column">
              <p>{{ languagePack.datahash }}：</p>
              <span
                >FA824C4504F21FC59250DA0CDF549DD392FD862BAF2689D246A07B9E941F04A9</span
              >
            </div>
            <div class="column">
              <p>{{ languagePack.totalvalueoflockedposition }}：</p>
              <span>0 GHM</span>
            </div>
            <div class="column">
              <p>{{ languagePack.constructor }}：</p>
              <span>无</span>
            </div>
          </div>
        </template>
      </BasicTitle>

      <div class="contracts_table">
        <div class="contracts_table_title">
          {{ languagePack.contracthistory }} {{ languagePack.xxtimesintotal }}
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
          <el-table-column
            prop="ID"
            :label="languagePack.useraddress"
            width="570"
          >
          </el-table-column>
          <el-table-column :label="languagePack.operationtime" width="430">
            <template slot-scope="scope">
              <p class="specialFont" @click="toGo('/address_detail')">
                {{ scope.row.name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            :label="languagePack.statussucceededfailed"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="user"
            :label="languagePack.details"
            align="center"
          >
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
            hide-on-single-page
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
      loading: false,
      tableList: [],
      contractData: {},
      pageSize: 10,
      page: 0,
      txtotal: 0,
    };
  },
  created() {
    this.queryContract(this.pageSize, this.page);
  },
  methods: {
    async queryContract(pageSize, page) {
      const address = this.$route.query.address;
      const res = await getContractInfo(address);
      const txlist = await getContractTx(pageSize, page, address);
      console.log("合约详细信息", res);
      console.log(txlist);
      this.tableList = txlist.data.list;
      this.txtotal = txlist.data.total;
      this.contractData = res.data;
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
};
</script>

<style lang="scss" scoped>
.PageStructure {
  margin-top: 24px;
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
</style>
