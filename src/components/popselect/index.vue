<template>
    <div v-show="selectIsShow" class="popselect">
        <p>1</p>
        <p>2</p>
        <p>3</p>
    </div>
</template>
<script>
export default {
    props:{
        selectIsShow:{
            typeof:Boolean,
            default:false
        }
    },
    data() {
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
.popselect{
      width: 100px;
      height: 100px;
      background: red;
      line-height: 1;
    }
</style>