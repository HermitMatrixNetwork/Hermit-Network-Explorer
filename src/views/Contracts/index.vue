<template>
<div>
    Contracts
    <div class="main">
    <Table/>
    </div>
</div>
</template>

<script>
import Table from '@/components/Table/index.vue'
export default {
    components:{Table}
}
</script>

<style lang='scss' scoped>
.main{
    margin: 10px 60px;
}
</style>