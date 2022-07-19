<template>
  <div>
      <h1>区块链</h1>
      <div>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
      </div>
      <div class="main">
          <Table/>
      </div>
  </div>
</template>

<script>
import Table from '@/components/Table/index.vue'
export default{
    name:'Blockchain',
    components:{ Table },
    data(){
        return{

        }
    }
}

</script>
<style lang="scss" scoped>

</style>
