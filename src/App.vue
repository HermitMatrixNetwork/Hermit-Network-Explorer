<template>
    <div id="app">
        <TabBar/>
        <router-view />
        <Bottom />
    </div>
</template>

<script>
import TabBar from '@/components/tabBar/index.vue';
import Bottom from '@/components/bottom/';
import 'element-ui/lib/theme-chalk/display.css';
export default {
    components: { TabBar, Bottom },
    data() {
        return {
            
        };
    },
    created() {
        this.$store.commit('CHANGE_LANGUAGE', 123);
    },
    mounted() {

    },
    watch: {

    },
};
</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: #333;
    // font-size: calc(100vw/750*100);
    // font-size: .2rem;
}

a {
    text-decoration: none;
    color: #333;
}

ul,
li {
    list-style: none;
}

</style>
