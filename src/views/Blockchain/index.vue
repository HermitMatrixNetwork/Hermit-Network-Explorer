<template>
  <div class="main">
      <h3>GHM的顶级账户</h3>
      <div class="pagination" >
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
      </div>
      <div>
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
    },
    mounted(){
        document.querySelector('body').style.background = "#F8FAFB"
    }
}

</script>
<style lang="scss" scoped>
.main{
    width: 1280px;
    margin: 0 auto;
    background: #FFFFFF;
    padding: 15px;
    .pagination{
        display: flex;
        justify-content: flex-end;
    }
}
</style>
