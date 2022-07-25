<template>
  <div>
      <h3>交易</h3>
      <main class="main">
        <Table/>
      </main>
  </div>
</template>

<script>
import Table from '@/components/Table/index.vue'
export default{
    name:'Tsx',
    components:{
        Table
    },
    data(){
        return{

        }
    }
}

</script>
<style lang="scss" scoped>
    .main{
        width: 1280px;
        height: 600px;
        margin: 0 auto;
        background: #FFFFFF;
        padding: 15px;
    }
    h3{
        width: 1280px;
        margin: 0 auto;
    }
</style>
