<template>
	<div>
		<h3>交易</h3>
		<main class="main">
			<el-row type="flex" class="total_title" align="middle">
				<el-col :span="15" style="padding-left: 10px;">总共寻获超过><span class="block_num">1,081,774</span>条交易（仅显示最新500K记录）</el-col>
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
      <el-table :data="tableData" size="mini" height="665px" class="table_box" :cell-style="columnStyle" :header-cell-style="rowStyle" @cell-click="toDetail">
        <el-table-column width="30px">
          <template>
            <el-popover
              placement="right"
              :offset="155"
              :visible-arrow="false"
              width="300px"
              trigger="click">
              <div class="popoverBox" style="font-size: 12px;">
                <div class="popoverBox1">
                  <div>状态 ：<span style="color: rgba(0,0,0,0.25);">(X个区块确认)</span></div>
                  <div class="popStatus" style="margin-top: 5px;">
                    <img src="@/assets/img/deal_succeed@2x.png" alt="" style="width: 14px;height: 14px;vertical-align: middle;" v-show="true">
                    <img src="@/assets/img/deal_lose@2x.png" alt="" style="width: 14px;height: 14px;vertical-align: middle;" v-show="false">
                    成功
                    <el-divider></el-divider>
                  </div>
                  <div v-for="(item, index) in statusTitle" :key="index">
                    <div style="margin-bottom: 5px;">{{ item.title }}</div>
                    <span v-show="index === 0">0 GHM ($0.00)</span>
                    <span v-show="index === 1">27,200Gas总量中实际消耗27,168Gas<br>@0.0004GHM</span>
                    <span v-show="index === 2">957820 (位置154)</span>
                    <el-divider></el-divider>
                  </div>
                </div>
                <div class="detailBox" @click="toTransDetail">查看详情</div>
              </div>
              <el-button slot="reference" class="showBtn" icon="el-icon-view" size="mini"></el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="block" label="交易哈希" width="150px">
          <template slot-scope="scope">
            <div style="display: flex;align-items: center;">
                <el-tooltip class="item" effect="dark" content="交易失败" placement="top-start">
                  <img src="@/assets/img/table_mistake@2x.png" alt="" style="width: 12px;height: 12px; margin-right: 3px;"/>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="scope.row.block" placement="top-start">
                  <span class="tranHashText">{{ scope.row.block }}</span>
                </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operationType" label="操作类型" width="100px">
          <template slot-scope="scope">
            <el-tag type="info" size="mini">{{ scope.row.operationType || '' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="transNum" label="区块" />
        <el-table-column prop="person" label="时长" />
        <el-table-column prop="fuelCon" label="发起地址" :show-overflow-tooltip="true" width="150px" />
        <el-table-column :width="operationType1 ? '80px' : '40px'">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.operationType1" type="info" size="mini">{{ scope.row.operationType || '' }}</el-tag>
            <el-button v-show="!scope.row.operationType1" class="toBtn" type="success" icon="el-icon-right" size="mini" circle />
          </template>
        </el-table-column>
        <el-table-column prop="fuelTotal" label="目标地址" width="150px" :show-overflow-tooltip="true"/>
        <el-table-column prop="blockReward" label="交易额" />
        <el-table-column prop="blockReward" label="手续费（GHM）"/>
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
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '合约执行', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '合约执行', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '合约执行', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '合约执行', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '合约执行', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '合约执行', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '合约执行', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '合约执行', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '转账', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '转账', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '转账', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '转账', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '转账', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '转账', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '转账', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '重新委托', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '重新委托', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '重新委托', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '重新委托', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '领取奖励', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '领取奖励', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '领取奖励', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
        {block: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', operationType: '领取奖励', transNum: 14184181818, person: '12 secs ago', fuelCon: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', fuelTotal: 'fdfdfdsfsdfdsfdsafsdafdsfdasfdasfdsfdsfdffdsf', blockReward: 0.55165456415111},
      ], // 表格数据
      currentPage: 1,
      statusTitle: [
        { title: '手续费 :' },
        { title: '燃料信息 :' },
        { title: '随机数 :' },
      ]
    }
	},
	mounted() {
		document.querySelector('body').style.background = '#F8FAFB'
		document.querySelector('.selected').style.color = '#1E42ED'
    let olg = document.querySelector('.el-popover')
    olg.style.fontSize = '12px'
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
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
          break;
        case 2: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
        case 3: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
          break;
        case 4: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
        case 5:
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
          break;
        case 7:
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
          break;
         case 8: 
          return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
          break;
         case 9: 
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

    showDetail() {
      let obtn = document.querySelectorAll('.el-button')
      // console.log('obtn', obtn);
      // obtn.forEach(item => item.style.backgroundColor = '#fff')      
    },

    toDetail(row, column) {
      console.log('row', row);
      switch(column.property){
        case 'block':
          console.log('跳转到交易详情');
          this.$router.push({
            name: 'transDetail'
          })
          break;
        case 'transNum':
          console.log('跳转到区块详情');
          this.$router.push({
            name: 'blockDetail'
          })
          break;
        case 'fuelCon':
          console.log('跳转到发起地址详情');
          this.$router.push({
            name: 'addressDetail'
          })
          break;
        case 'fuelTotal':
          console.log('跳转到目标地址详情');
          this.$router.push({
            name: 'addressDetail'
          })
          break;
        default:
          break;
      }
    },

    toTransDetail() {
      console.log('查看交易详情');
      this.$router.push({
        name: 'transDetail'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
	width: 1280px;
	height: 732px;
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

    .tranHashText {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

::v-deep .popoverBox {
  width: 300px;
  display: flex;
  flex-direction: column;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px !important;
  color: rgba(0,0,0,0.85);
}

::v-deep .detailBox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  color: #5671f2;
  cursor: pointer;
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
  height: 23px !important;
  line-height: 23px !important;
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

::v-deep .showBtn {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 10px;
  border: none;

  &:hover {
    background-color: #D5D7E3FF;
  }
}

::v-deep .pagina {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 18px;
}

::v-deep .toBtn {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #55C499;
  background-color: rgba(85,196,153,0.20);
  border-color: rgba(85,196,153,0.10);
}

::v-deep .el-divider--horizontal {
  margin: 15px 0;
}

::v-deep .el-popover {
  width: 300px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px !important;
  color: rgba(0,0,0,0.85);
}
</style>
