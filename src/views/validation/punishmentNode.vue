<template>
  <div class="punishmentNode">
    <div class="punishment-main">
      <div class="title">{{ languagePack.nodetext61 }}</div>
      <div class="punishment-main-table">
        <div class="header">
          {{ languagePack.nodetext62 }}
          <span style="color: #5671f2;padding:0 5px;">{{ nodelist.length}}</span>
          {{ languagePack.nodetext63 }}
        </div>
        <div class="tableBody">
          <el-table
            size="mini"
            :data="list"
            height="auto"
            :row-style="{ height: '58px',cursor: 'pointer' }"
            :header-cell-class-name="'tableHeaderCellStyle'"
            :row-class-name="'tableRowStyle'"
            @row-click="toNode"
            v-loading="loading"
          >
            <div slot="empty" style="height:600px,line-height:600px">{{ languagePack.prompttext11 }}</div>
            <el-table-column
              :label="languagePack.nodetext64"
              width="120"
              align="center"
            >
            <template slot-scope="scope">
              <div>{{scope.$index+1 + Number(page.page*page.pageSize)}}</div>
            </template>
          </el-table-column>
            <el-table-column
              :label="languagePack.nodetext65"
              width="178"
              prop="moniker"
            >
              <template slot-scope="scope">
                <div
                  class="specialFont"
                >
                  {{ scope.row.moniker }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.nodetext66"
              width="270"
              align="right"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.tokens/1e6 }} GHM</div>
              </template>
            </el-table-column>
            <el-table-column
              :label="languagePack.nodetext70"
              width="270"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.total }}
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext67" width="200">
              <template slot-scope="scope">
                <!-- <div>{{ dealTime(scope.row.unbonding_time) }}</div> -->
                <el-tooltip effect="dark" :content="'(UTC) '+scope.row.unbonding_time" placement="top">
                  <span>{{ dealTime(scope.row.unbonding_time)}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext68" align="right">
              <template slot-scope="scope">
                <div>{{ scope.row.unbonding_height }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="footer">
          <el-pagination
            small
            layout="prev, pager, next,sizes"
            :total="nodelist.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 25, 50]"
            :page-size="10"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allValidationNode } from "@/api/api.js";
import { getNodeblockList } from "@/api/validation.js";

import mixins from "@/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      list: [],
      loading: true,
      nodelist:[],
      page:{
        page:0,
        pageSize:10
      }
    };
  },
  created() {},
  async mounted() {
    const res = await allValidationNode();
    
    this.nodelist = res.validators.filter((item) => item.jailed);
    this.dealArray(this.nodelist.slice(0,10))
  },
  methods: {
    toNode(value) {
      this.$router.push({ name: "node_detail", query: { address:value.operator_address } });
    },
    handleSizeChange(val) {
      this.list = []
      this.dealArray(this.nodelist.slice(this.page.page = 0,this.page.pageSize = val))
    },
    handleCurrentChange(val) {
      this.list = []
      this.page.page = val - 1
      this.dealArray(this.nodelist.slice(this.page.page*this.page.pageSize,val*this.page.pageSize))
    },
    dealTime(time,hour= -8) {
        let UTC = Date.parse(new Date(time)) - 60*60*1000*hour
        let date = new Date(UTC)
        let year = date.getFullYear()
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let hours = date.getHours()<10? '0' + date.getHours() : date.getHours()
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        let seconds = date.getSeconds()<10? '0' +date.getSeconds() :date.getSeconds()
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    dealArray(array){
      array.forEach(async (e) => {
        let {
          description: { moniker },
          tokens,
          min_self_delegation,
          unbonding_time,
          unbonding_height,
          operator_address,
        } = e;
        // let {data:{total}} = await getNodeblockList(0,1,operator_address)
        this.list.push({
          moniker,
          tokens,
          min_self_delegation,
          unbonding_height,
          operator_address,
          unbonding_time:this.dealTime(unbonding_time,31),
          total:0
        });
      });
    }
  },
  watch: {
    list(value) {
      if (Array.isArray(value)) {
        this.loading = value.length === 0 ? true : false;
        setTimeout(()=>{
          this.loading = false
        },1500)
        this.list.forEach(async item=>{
          let {data:{total}} = await getNodeblockList(0,1,item.operator_address)
          this.$set(item,'total',total)
        })



      } else {
        this.loading = false;
      }

    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
  },
};
</script>

<style lang="scss" scoped>
.punishment-main {
  width: 1280px;
  margin: 0 auto 80px;
  .title {
    height: 60px;
    line-height: 60px;
    font-weight: 500;
    font-size: 20px;
    color: rgba(20, 37, 62, 0.85);
  }
  &-table {
    width: 1280px;
    height: 732px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    .header,
    .footer {
      height: 60px;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.85);
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .tableBody {
      height: 612px;
      .el-table{
        min-height: 612px;
      }
    }
  }
}

@media screen and (max-width: 598px) {
  .punishment-main {
    .title {
      padding-left: 10px;
    }
    width: 100%;
    &-table {
      width: 100%;
    }
  }
}
</style>
