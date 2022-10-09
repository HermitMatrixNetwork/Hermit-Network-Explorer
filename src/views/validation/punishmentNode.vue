<template>
  <div class="punishmentNode">
    <div class="punishment-main">
      <div class="title">{{ languagePack.nodetext61 }}</div>
      <div class="punishment-main-table">
        <div class="header">
          {{ languagePack.nodetext62 }}
          <span style="color: #5671f2">{{ list.length }}</span>
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
              type="index"
              :label="languagePack.nodetext64"
              width="120"
              align="center"
            ></el-table-column>
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
              align="right"
            >
              <template slot-scope="scope">
                {{ scope.row.unbonding_height }}
              </template>
            </el-table-column>
            <el-table-column :label="languagePack.nodetext67" width="200">
              <template slot-scope="scope">
                <div>{{ dealTime(scope.row.unbonding_time) }}</div>
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
            :total="list.length"
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
import { getValidationList } from "@/api/validation.js";

import mixins from "@/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      list: [],
      loading: true,
    };
  },
  created() {},
  async mounted() {
    // const res = await allValidationNode();
    // let arr = res.validators.filter((item) => item.jailed);
    // console.log(arr);
    // arr.forEach((e) => {
    //   let {
    //     description: { moniker },
    //     tokens,
    //     min_self_delegation,
    //     unbonding_time,
    //     unbonding_height,
    //     operator_address,
    //   } = e;
    //   this.list.push({
    //     moniker,
    //     tokens,
    //     min_self_delegation,
    //     unbonding_height,
    //     operator_address,
    //     unbonding_time: unbonding_time.split(".")[0].replace(/[A-Z]/g, " "),
    //   });
    // });
    // setTimeout(() => {
    //   this.loading = false;
    // }, 3000);
    const {data:{list}} = await getValidationList(0, 0);
    // console.log(list);
    this.list= list.filter((item) => item.jailed);
    
  },
  methods: {
    toNode(value) {
      this.$router.push({ name: "node_detail", query: { address:value.operator_address } });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    dealTime(time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let hours = date.getHours()<10? '0' + date.getHours() : date.getHours()
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        let seconds = date.getSeconds()<10? '0' +date.getSeconds() :date.getSeconds()
        return year + '-' + month + '-' + day + ' ' + (hours-9 )+ ':' + minutes + ':' + seconds
    }
  },
  watch: {
    list(value) {
      if (Array.isArray(value)) {
        this.loading = value.length === 0 ? true : false;
        setTimeout(()=>{
          this.loading = false
        },1500)
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
