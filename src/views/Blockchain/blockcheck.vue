<template>
	<div>
		<h3>区块</h3>
		<main class="main">
			<el-row type="flex" class="total_title" align="middle">
				<el-col :span="15" style="padding-left: 10px;">总共<span class="block_num">1,081,774</span>个区块</el-col>
				<el-col :span="9">
					<el-pagination
            border	
						layout="prev, pager, next"
						:total="1000"
						small
            class="pagina"
					>
					</el-pagination>
				</el-col>
			</el-row>
      <el-table :data="tableData" size="mini" height="535px" class="table_box" :cell-style="columnStyle" :header-cell-style="rowStyle" @row-click="toBlockDetail">
        <el-table-column prop="block" label="区块" width="80px" />
        <el-table-column prop="blockAge" label="块龄" width="150px"/>
        <el-table-column prop="transNum" label="交易数" width="70px" />
        <el-table-column prop="person" label="提案人" width="100px" />
        <el-table-column prop="fuelCon" label="燃料用量">
          <template slot-scope="scope">
            <el-progress :percentage="30" :width="196" :stroke-width="6" color="#1E42EDFF" :format="format(scope.row.fuelCon)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="fuelTotal" label="燃料总量" width="100px"/>
        <el-table-column prop="blockReward" label="出块奖励（GHM）" width="150px"/>
      </el-table>
      <el-row type="flex" justify="end" >
        <el-pagination
          popper-class="popperSelect"
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[50, 100]"
          :page-size="50"
          layout="prev, pager, next, sizes"
          :total="1000">
        </el-pagination>
      </el-row>
		</main>
  
	</div>
</template>

<script>
export default {
	data() {
		return {
      tableData: [
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
        {block: 3021245, blockAge: '12 secs ago', transNum: 525, person: 'AiCJA', fuelCon: '22,769,528', fuelTotal: '808,080,254', blockReward: 0.55165456415111},
      ], // 表格数据
      currentPage: 1
    }
	},
	mounted() {
		document.querySelector('.selected').style.color = '#1E42ED'
	},
  methods: {
    // 表头行样式
    rowStyle({row, column, rowIndex, columnIndex}) {
      if (!rowIndex) return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #14253E;'
    },

    // 指定进度条文字内容
    format(value) {
        return () => {
          return value
        }
    },

    // 设置列的字体颜色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      switch(columnIndex) {
        case 0:
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;'
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

    handleSizeChange() {
        let oul = document.querySelectorAll('.el-select-dropdown__list li')
        oul.forEach(item => {
          console.log(item.style.color);
          item.style.color = ''
        })
        let oli = document.querySelector('.selected')
        oli.style.color = '#606266'
    		document.querySelector('.hover').style.color = '#1E42ED'
    },

    handleCurrentChange() {
      console.log('11');
    },

    // 某一行被点击跳转区块详情页面
    toBlockDetail(row) {
      console.log('区块详情页', row);
      this.$router.push({name: 'blockDetail'})
    }
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
::v-deep li {
  border: 1px solid #E9EAEF !important;
  border-radius: 2px !important;
  margin: 0 4px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: rgba(20,37,62,0.85);

  &:hover {
    color: #1E42ED !important;
  }

}
::v-deep li.active {
  color: #1E42ED !important;
  border: 1px solid #1E42ED !important;
  border-radius: 2px !important;
}

::v-deep .btn-prev,.btn-next {
  width: 30px;
  border: 1px solid #E9EAEF !important;
  border-radius: 2px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: rgba(20,37,62,0.85);

  &:hover {
    color: #1E42ED !important;
  }
}

::v-deep .btn-next {
  width: 30px;
  border: 1px solid #E9EAEF !important;
  border-radius: 2px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: rgba(20,37,62,0.85);
  padding-left: 6px !important;

  &:hover {
    color: #1E42ED !important;
  }
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
  cursor: pointer;
}

::v-deep .pagina {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 18px;
}
</style>
