<template>
  <el-table :data="tableData" size="mini">
    <el-table-column prop="date" label="排名" width="80px"> </el-table-column>
    <el-table-column prop="name" label="地址" width="420px"> </el-table-column>
    <el-table-column prop="address" label="标签" width="420px"> </el-table-column>
    <el-table-column prop="date" label="余额"> </el-table-column>
    <el-table-column prop="name" label="百分比"> </el-table-column>
    <el-table-column prop="address" label="交易次数"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableHeader: [Array,Object],
  },
  data() {
    return {
      tableData: [
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区",
        },
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区",
        },
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区",
        },
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区",
        },
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区",
        },
      ],
    };
  },
  methods: {},
};
</script>
