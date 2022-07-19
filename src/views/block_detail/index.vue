<template>
    <div>
        block_detail
        <div>
            {{ blockheight.block }}
            {{ blockheight.block_id }}
        </div>
    </div>
</template>

<script>
import { getBlockContent } from '@/api/api.js';
export default {
    data() {
        return {
            blockheight: '',
        };
    },
    created() {
        this.getblockDetail(this.$route.query.height);
    },
    methods: {
        async getblockDetail(value) {
            const res = await getBlockContent(value);
            console.log(res);
            this.blockheight = res;
        },
    },
};
</script>

<style lang="scss" scoped></style>
