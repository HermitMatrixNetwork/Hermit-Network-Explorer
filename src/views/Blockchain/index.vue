<template>
	<div>
		<h3>GHM的顶级账户</h3>
		<main class="main">
			<div class="table_title">
				展示匿名币余额排名前<span>1000</span>账户
			</div>
      <el-skeleton v-if="!tableData.length" :rows="20" animated></el-skeleton>
			<el-table
        v-else
				:data="tableData"
				size="mini"
				height="665px"
				class="table_box1"
				:cell-style="columnStyle"
				:header-cell-style="rowStyle"
				@cell-click="toDetail"
			>
				<el-table-column
					type="index"
					prop="block"
					label="排名"
					width="80px"
					align="center"
				/>
				<el-table-column
					prop="address"
					label="地址"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<el-link :underline="false">{{scope.row.address}}</el-link>
					</template>
				</el-table-column>
				<el-table-column prop="transNum" label="标签" />
				<el-table-column prop="balance" label="余额" />
				<el-table-column prop="percentage" label="百分比" />
				<el-table-column
					prop="tx_count"
					label="交易次数"
					width="100px"
				/>
			</el-table>
			<el-row type="flex" justify="end">
				<el-pagination
					small
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="page.currentPage"
					:page-sizes="[10, 25, 50]"
					:page-size="page.pageSize"
					layout="prev, pager, next, sizes"
					:total="page.total"
				>
				</el-pagination>
			</el-row>
		</main>
	</div>
</template>

<script>
import { queryAccountList } from '@/api/api'

export default {
	name: 'Blockchain',
	data() {
		return {
			tableData: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 0
      },
		}
	},
	mounted() {
		document.querySelector('body').style.background = '#F8FAFB'
		document.querySelector('.selected').style.color = '#1E42ED'

    this.getData()
	},
	methods: {
		// 表头行样式
		rowStyle({ row, column, rowIndex, columnIndex }) {
			if (!rowIndex)
				return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #14253E;'
		},

		// 设置列的字体颜色
		columnStyle({ row, column, rowIndex, columnIndex }) {
			switch (columnIndex) {
				case 0:
					return 'font-family: PingFangSC-Regular;font-weight: 400;font-size: 12px;color: rgba(20,37,62,0.65);'
					break
				case 1:
					return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: #5671F2;cursor: pointer;'
					break
				case 2:
					return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
					break
				case 3:
					return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
					break
				case 4:
					return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
					break
				case 5:
					return 'font-family: PingFangSC-Medium;font-weight: 500;font-size: 12px;color: rgba(20,37,62,0.45);'
					break
				default:
					break
			}
		},

		handleSizeChange(val) {
			let oul = document.querySelectorAll('.el-select-dropdown__list li')
			oul.forEach(item => item.style.color = '')
			let oli = document.querySelector('.selected')
			oli.style.color = '#606266'
			document.querySelector('.hover').style.color = '#1E42ED'

      this.page.pageSize = val
      this.getData()
		},

		handleCurrentChange() {
			console.log('11')
		},

    async getData() {
      let { data } = await queryAccountList({
        chain_id: 'ghmdev',
        limit: this.page.pageSize,
        index: this.page.currentPage
      })
      console.log('顶级账户', data);
      this.tableData = data.list
    },

		toDetail(row, column) {
			console.log('row', row)
			switch (column.property) {
				case 'address':
					console.log('跳转到地址详情')
					break
				default:
					break
			}
		},
	},
}
</script>
<style lang="scss" scoped>
h3 {
	width: 1280px;
	height: 60px;
	line-height: 60px;
	margin: 0 auto;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: 20px;
	color: rgba(20, 37, 62, 0.85);
	letter-spacing: 0;
}

.main {
	width: 1280px;
	margin: 0 auto;
	// padding: 15px;
	height: 760px;
	background: #ffffff;
	border: 1px solid #e9eaef;
	box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
	border-radius: 4px;

	.table_title {
		font-family: PingFangSC-Medium;
		font-weight: 500;
		font-size: 12px;
		color: rgba(20, 37, 62, 0.85);
		letter-spacing: 0;
		padding-left: 16px;
		padding-top: 21px;
		padding-bottom: 21px;
		line-height: 12px;

		span {
			color: #5671f2ff;
			margin: 0 3px;
		}
	}

	.table_box {
		height: 600px;
		margin-top: 16px;
		background: #ffffff;
		border: 1px solid #e9eaef;
		box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
		border-radius: 4px;

		.table_title {
			font-family: PingFangSC-Medium;
			font-weight: 500;
			font-size: 12px;
			color: rgba(20, 37, 62, 0.85);
			letter-spacing: 0;
			padding-left: 16px;
			padding-top: 21px;
			padding-bottom: 21px;
			line-height: 12px;

			span {
				color: #5671f2ff;
				margin: 0 3px;
			}
		}
	}
}

::v-deep li {
	border: 1px solid #e9eaef !important;
	border-radius: 2px !important;
	margin: 0 4px !important;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	font-size: 12px;
	color: rgba(20, 37, 62, 0.85);

	&:hover {
		color: #1e42ed !important;
	}
}
::v-deep li.active {
	color: #1e42ed !important;
	border: 1px solid #1e42ed !important;
	border-radius: 2px !important;
}

::v-deep .btn-prev,
.btn-next {
	width: 30px;
	border: 1px solid #e9eaef !important;
	border-radius: 2px !important;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	font-size: 12px;
	color: rgba(20, 37, 62, 0.85);

	&:hover {
		color: #1e42ed !important;
	}
}

::v-deep .btn-next {
	width: 30px;
	border: 1px solid #e9eaef !important;
	border-radius: 2px !important;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	font-size: 12px;
	color: rgba(20, 37, 62, 0.85);
	padding-left: 6px !important;

	&:hover {
		color: #1e42ed !important;
	}
}

::v-deep th {
	background-color: #f8f9fa !important;
}

::v-deep .el-input__inner {
	height: 23px !important;
	line-height: 23px !important;
	// border-color: #1E42ED !important;

	&:hover {
		color: #1e42ed !important;
		border-color: #1e42ed !important;
	}
}

::v-deep .is-focus {
	border-color: #1e42ed !important;
}

::v-deep .el-table__row {
	height: 60px !important;
}

::v-deep .table_box1 {
	margin-bottom: 10px;
}

::v-deep .el-link--inner {
	width: 50%;
	color: #1e42ed !important;
	font-size: 12px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	&:hover {
		color: #1e42ed;
		border-bottom: 1px solid #1e42ed;
	}
}

::v-deep .el-link {
	justify-content: start;
}
</style>
