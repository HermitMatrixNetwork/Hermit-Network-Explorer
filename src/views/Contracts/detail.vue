<template>
  <div>
    <div class="PageStructure">
      <BasicTitle :title="languagePack.contractinformation">
        <template #message>
          <div class="basicStyle messageBasic">
            <div class="column">
              <p>{{ languagePack.contractaddress }}：</p>
              <span
                >#0x40c7c726995dec1676e15d3a9c471dc47aa7f56c3abc1ebf2b4e5781cc1b05b1</span
              >
            </div>
            <div class="column">
              <p>{{ languagePack.sourcecode }}：</p>
              <span>N/A</span>
            </div>
            <div class="column">
              <p>{{ languagePack.nametag }}：</p>
              <span>隐士矩阵</span>
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
              <span>4519</span>
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
          {{ languagePack.contracthistory }} {{languagePack.xxtimesintotal}}
        </div>
        <el-table
          height="612px"
          :data="tableList"
          style="width: 100%"
          :header-cell-class-name="'tableHeaderCellStyle'"
          :row-class-name="'tableRowStyle'"
          :row-style="{height:'58px'}"
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
          <el-pagination small layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  data(){
    return {
      loading:false,
      tableList:[
        {ID:'1',name:'test'}
      ]
    }
  },
  created() {},
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
