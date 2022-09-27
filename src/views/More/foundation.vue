<template>
  <div class="foundation">
    <div class="foundationMain">
      <div class="foundationBox">
        <BasicTitle :title="'基金会地址'">
          <template #message>
            <el-table :data="addressList" style="width: 100%">
              <el-table-column prop="id" label="#" width="80"></el-table-column>
              <el-table-column label="地址">
                <template slot-scope="scope">
                  <p class="adresStyle">{{ scope.row.address }}</p>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                small
                layout="prev, pager, next, sizes"
                :page-sizes="[10, 25, 50]"
                :page-size="10"
                :total="addressList.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                
              >
              </el-pagination>
            </div>
          </template>
        </BasicTitle>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressList: [
        { id: 1, address: "0x9BF4001d307dFd62B26A2F1307ee0C0307632d59" },
        { id: 2, address: "0x9BF4001d307dFd62B26A2F1307ee0C0307632d59" },
        { id: 3, address: "0x9BF4001d307dFd62B26A2F1307ee0C0307632d59" },
        { id: 4, address: "0x9BF4001d307dFd62B26A2F1307ee0C0307632d59" },
        { id: 5, address: "0x9BF4001d307dFd62B26A2F1307ee0C0307632d59" },
        { id: 6, address: "0x9BF4001d307dFd62B26A2F1307ee0C0307632d59" },
        { id: 7, address: "0x9BF4001d307dFd62B26A2F1307ee0C0307632d59" },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.foundationMain {
  width: 1280px;
  margin: 0 auto 80px;
  .foundationBox {
    margin-top: 24px;
  }
}

.adresStyle {
  height: 18px;
  font-weight: 500;
  font-size: 12px;
  color: #5671f2;
  letter-spacing: 0;
  line-height: 18px;
}
.pagination {
  margin-top: 16px;
  text-align: right;
}
</style>
