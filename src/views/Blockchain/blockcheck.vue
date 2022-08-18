<template>
	<div>
		<h3>区块</h3>
		<main class="main">
			<el-row type="flex" class="total_title" align="middle">
				<el-col :span="15" style="padding-left: 10px;">总共<span class="block_num">{{ blockTotal }}</span>个区块</el-col>
				<el-col :span="9">
					<el-pagination
            border	
						layout="prev, pager, next"
						:total="page.total"
						small
            class="pagina"
					>
					</el-pagination>
				</el-col>
			</el-row>
      <el-skeleton v-if="!tableData.length" animated :rows="20"/>
      <el-table v-else :data="tableData" size="mini" height="535px" class="table_box" :cell-style="columnStyle" :header-cell-style="rowStyle" @cell-click="toDetail">
        <el-table-column prop="_id" label="区块" width="80px" />
        <el-table-column prop="timestamp" label="块龄" width="150px" :formatter="mainFomrmatter"/>
        <el-table-column prop="tx_count" label="交易数" width="100px" />
        <el-table-column prop="proposer_address" label="提案人" width="250px" :show-overflow-tooltip="true" />
        <el-table-column prop="gas_used" label="燃料用量">
          <template slot-scope="scope">
            <el-progress :percentage="percenTage" :width="196" :stroke-width="6" color="#1E42EDFF" :format="format(scope.row.gas_used, scope.row.gas_total)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="gas_total" label="燃料总量" width="100px"/>
        <el-table-column prop="reward" label="出块奖励（GHM）" width="150px"/>
      </el-table>
      <el-row type="flex" justify="end" >
        <el-pagination
          popper-class="popperSelect"
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :page-sizes="[50, 100]"
          :page-size="page.pageSize"
          layout="prev, pager, next, sizes"
          :total="page.total">
        </el-pagination>
      </el-row>
		</main>
  
	</div>
</template>

<script>
import { queryBlockList } from '@/api/api'
import { pastTime } from '@/utils/common'

export default {
	data() {
		return {
      blockTotal: 0,
      tableData: [], // 表格数据
      page: {
        pageSize: 50,
        total: 0,
        currentPage: 0
      },
      percenTage: 1 // 百分比占度条不可设置为0
    }
	},
	mounted() {
		document.querySelector('.selected').style.color = '#1E42ED'
    this.getBlockData()
	},
  methods: {
    // 表头行样式
    rowStyle({row, column, rowIndex, columnIndex}) {
      if (!rowIndex) return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #14253E;'
    },

    // 指定进度条文字内容
    format(val, val2) {
      let num = Number(val)
      let num2 = Number(val2)
      let result = (num/num2*100).toFixed(2)
      if (result && result !== 'NaN'){
        this.percenTage = Number(result)
        return () => {
          return `${num} (${result})%`
        }
      } else {
        return () => {
          return '0%'
        }
      }
    },

    // 设置列的字体颜色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      switch(columnIndex) {
        case 0:
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
          break;
        case 1: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
        case 2: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
        case 3: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;'
          break;
        case 5:
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
        case 6:
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
        default:
          break;
      }
    },

    // 获取区块数据
    async getBlockData() {
      let { data } = await queryBlockList({
        chain_id: 'ghmdev',
        limit: this.page.pageSize,
        index: this.page.currentPage
      })
      console.log('区块数据', data);
      this.tableData = data.list
      this.blockTotal = data.total
    },

    handleSizeChange(val) {
        let oul = document.querySelectorAll('.el-select-dropdown__list li')
        oul.forEach(item => {
          console.log(item.style.color);
          item.style.color = ''
        })
        let oli = document.querySelector('.selected')
        oli.style.color = '#606266'
    		document.querySelector('.hover').style.color = '#1E42ED'
        
        this.page.pageSize = val
        this.getBlockData()
    },

    handleCurrentChange(val) {
      console.log('11', val);
    },

    mainFomrmatter(row, column) {
      if (column.property = 'timestamp') {
        return pastTime(row.timestamp)
      }
    },

    toDetail(row, column) {
			console.log('row', row)
			switch (column.property) {
				case '_id':
					console.log('跳转到区块详情')
          this.$router.push({
            name: 'blockDetail',
            query: {
              height: row._id
            }
            })
					break
				default:
					break
			}
		},
  }
}
</script>

<style lang="scss" scoped>
.main {
	width: 1280px;
	height: 600px;
	margin: 0 auto;
	background: #ffffff;
	padding: 15px 0;
	border: 1px solid #e9eaef;
	box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
	border-radius: 4px;

  .total_title {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 12px;
    color: rgba(20,37,62,0.85);
    letter-spacing: 0;
    margin-bottom: 10px;

    .block_num {
		  font-family: PingFangSC-Medium;
		  font-weight: 500;
		  font-size: 12px;
		  color: #5671f2;
		  letter-spacing: 0;
      margin: 0 5px;
	  }
  }

  .table_box {
    margin-bottom: 10px;
  }
}
h3 {
	width: 1280px;
	height: 60px;
	line-height: 60px;
	margin: auto;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: 20px;
	color: rgba(20, 37, 62, 0.85);
	letter-spacing: 0;
}

::v-deep th {
  background-color: #F8F9FA !important;
}

::v-deep .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
  // border-color: #1E42ED !important;

  &:hover {
    color: #1E42ED !important;
    border-color: #1E42ED !important;
  }
}

::v-deep .is-focus {
  border-color: #1E42ED !important;
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
  color: rgba(20,37,62,0.85);
}

::v-deep .el-progress-bar__outer {
  width: 196px;
}

::v-deep .el-table__row {
  height: 60px !important;
  // cursor: pointer;
}

::v-deep .pagina {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 18px;
}
</style>
