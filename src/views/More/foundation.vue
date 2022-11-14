<template>
  <div class="foundation">
    <div class="foundationMain">
      <div class="foundationBox">
        <BasicTitle :title="languagePack.foundationtext01">
          <template #message>
            <el-table :data="addressList" style="width: 100%">
              <el-table-column prop="id" label="#" width="80"></el-table-column>
              <el-table-column :label="languagePack.foundationtext02">
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
        { id: 1, address: "ghm12hx2kkr3awzgdn00gl7fmqlmr480346uv7gwvt" },
        { id: 2, address: "ghm1sfxzq7fwn3jykm5z4tls9afqspctqgan26wdrv" },
        { id: 3, address: "ghm1jye5xd9fcmks794zc3enxl0qnczqann2j0dhfj" },
        { id: 4, address: "ghm1uual9pxwfshlaygseezf8qrsf7zs3vv52wng3s" },
        { id: 5, address: "ghm1r60d2ucdj7ngacjmm65rwalqepq0rp648ctg2y" },
        { id: 6, address: "ghm1g9fl7d0a9t282td5cddpx9f0gx2rrvf42r7td7" },
        { id: 7, address: "ghm1k9ya7jtdpduh4taee0c85frt33ynpz9ml0s0dn" },
        { id: 8, address: "ghm1ddg36m3grj74tueegkv3fy0w4y7ln6yuagclhu" },
        { id: 9, address: "ghm1ynd7p4vtd8gagvmp2c77jrfrk7necwpwr4gef3" },
        { id: 10, address: "ghm1sn0wemk4duqfmdetjg3w6d7u496404g5r4hw9r" },
        { id: 11, address: "ghm1u5ed3yy4pgddssss9us8x5rnvd48ygrwame4z4" },
        { id: 12, address: "ghm1agm7zw0g8hh7q2d97cvcmav67xdtr9lddf2vkp" },
        { id: 13, address: "ghm1qdxw6cwmjtjcdp3vw4qy4n963ksqqq5nx8zmxk" },
        { id: 14, address: "ghm1na3r0jtwryzsegax7dld04da5setl3s3vvh7tg" },
        { id: 15, address: "ghm1kxmxcc5qg59cy69jz82xup0gymfctfjr2fafhn" },
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
  computed:{
    languagePack(){
      return this.$store.state.Language
    }
  },
  mounted() {
    
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
