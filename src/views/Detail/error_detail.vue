<template>
<div>
    <div class="PageStructure">
        <h3>Search not found</h3>
        <button @click="toGo('/home')">back home</button>
    </div> 
</div>
</template>

<script>
import mixins from '@/mixins';
export default {
    mixins:[mixins]
}
</script>

<style lang='scss' scoped>
.PageStructure{
    background: #FFFFFF;
    height: 600px;
}
</style>
