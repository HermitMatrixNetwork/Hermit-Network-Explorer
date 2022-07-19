<template>
    <div class="Home">
        <div class="setting_Image">
            <div class="inputVal">
                <el-input
                    :placeholder="languagePack.text06"
                    v-model="input3"
                    class="input-with-select"
                >
                    <el-select v-model="select" slot="prepend">
                        <el-option :label="languagePack.text07" value="1"></el-option>
                        <el-option :label="languagePack.text08" value="2"></el-option>
                        <el-option :label="languagePack.text09" value="3"></el-option>
                        <el-option :label="languagePack.text10" value="4"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                </el-input>
            </div>
            <div class="banner">
                <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" alt="" />
            </div>
        </div>
        <div class="pageMain">
            <div class="block-message">
                <div class="blockLeft">
                    <div>
                        {{ languagePack.text19 }}
                        <p @click="block_detail" class="blockHeight">{{ blockHeight }}</p>
                    </div>
                    <div>
                        {{ languagePack.text18 }}
                        <p>{{ outNode }}</p>
                    </div>
                    <div>{{ languagePack.text20 }}</div>
                    <div>
                        {{ languagePack.text21 }}
                        <p>{{ totalNum }}</p>
                    </div>
                </div>
                <div class="blockRight">
                    <!-- <div>
                        折线图
                    </div> -->
                </div>
            </div>
            <div class="block-chart">
                <div class="outBlockTime">
                    {{ languagePack.text12 }}
                </div>
                <div class="outBlockNum">
                    {{ languagePack.text13 }}
                </div>
            </div>

            <div class="allblock-number">
                <div class="newBlock">
                    <h3>{{ languagePack.text14 }}</h3>
                    <!-- <Table></Table> -->
                    <button class="seeAll">{{ languagePack.text16 }}</button>
                </div>
                <div class="topBlock">
                    {{ languagePack.text15 }}
                    <ul>
                        <li v-for="item in 20" :key="item">
                            {{ item }}
                        </li>
                    </ul>
                    <button class="seeAll">{{ languagePack.text17 }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { bar, line } from '@/echarts/index.js';
import { Wallet } from 'secretjs';
import Table from '@/components/Table/index.vue';
import { getLatestBlock, allAdresQuantity, pledgeParameter, totalCirculation } from '@/api/api.js';
export default {
    name: 'Home',
    components: { Table },
    data() {
        return {
            input3: '',
            select: '1',
            screenWidth: document.body.clientWidth, // 屏幕宽度
            timer: false,
            aa: '',
            blockHeight: 0,
            timer2: '',
            totalNum: 0,
            issueNum: '',
            pledgeNum: '',
            outNode: '',
        };
    },
    created() {
        // console.log(Wallet);
        this.getnowBlockHeight();
        this.timer2 = setInterval(() => this.getnowBlockHeight(), 4000);
        this.getBlockMsg();
    },
    mounted() {
        line('.blockRight');
        this.aa = document.querySelector('.outBlockTime');
        bar(document.querySelector('.outBlockTime'), { title: this.$store.state.Language.text12 });
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth;
            })();
        };
    },
    methods: {
        //获取当前区块高度
        async getnowBlockHeight() {
            const res = await getLatestBlock();
            this.blockHeight = res.block.last_commit.height;
        },
        block_detail() {
            this.$router.push({ path: 'block_detail', query: { height: this.blockHeight } });
        },
        searchBtn() {
            if (!this.input3.trim()) {
                alert('输入不能为空');
                this.input3 = '';
                return;
            }
            switch (this.select * 1) {
                case 1:
                    console.log('通过hash搜索');
                    break;
                case 2:
                    console.log('通过块搜索');
                    break;
                case 3:
                    console.log('通过地址搜索');
                    break;
                case 4:
                    console.log('通过token搜索');
                    break;
                default:
                    break;
            }
        },
        //获取总地址数量
        async getBlockMsg() {
            const res = await allAdresQuantity();
            const issueNum = await totalCirculation();
            const pledgeNum = await pledgeParameter();
            this.totalNum = res.pagination.total;
            this.issueNum = issueNum.supply[0].amount;
            this.outNode = issueNum.supply[0].denom;
            this.pledgeNum = pledgeNum.params.historical_entries;
        },
    },
    beforeDestroy() {
        clearInterval(this.timer2);
    },
    computed: {
        languagePack() {
            return this.$store.state.Language;
        },
    },
    watch: {
        screenWidth(val) {
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if (!this.timer) {
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                this.screenWidth = val;
                this.timer = true;
                let that = this;
                setTimeout(function () {
                    bar(that.aa, { title: that.$store.state.Language.text12 });
                    // that.getECharts()  // 操作
                    // console.log(val);
                    that.timer = false;
                }, 500);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.Home {
    width: 100%;
    height: 100%;
}

.setting_Image {
    width: 100%;
    height: 250px;
    background: pink;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .inputVal {
        flex: 2;
        margin: 0 60px;

        // .input-with-select {
        //     input {
        //     }
        // }
    }

    .banner {
        flex: 1;
        text-align: center;
    }
}

.pageMain {
    margin: 0 60px;

    .block-message {
        background: #808080;
        height: 200px;
        transform: translateY(-25%);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .blockLeft {
            flex: 2;
            height: 100%;
            display: flex;
            flex-wrap: wrap;

            div {
                width: 50%;
                height: 50%;
                background: rgb(233, 233, 125);
                border: 2px solid #000;
                box-sizing: border-box;
            }
        }

        .blockRight {
            flex: 1;
            height: 100%;
        }
    }

    //实时区块图标
    .block-chart {
        height: 180px;
        background: skyblue;
        border-radius: 20px;
        display: flex;
        align-items: center;

        div {
            flex: 1;
            height: 100%;
            border: 1px solid red;
            box-sizing: border-box;
        }
    }

    //区块数、当选验证节点
    .allblock-number {
        height: 600px;
        display: flex;
        align-items: center;

        div {
            // flex: 1;
            width: 50%;
            height: 100%;
            text-align: center;
            background: #999;
        }
        .seeAll {
            width: 400px;
            height: 60px;
            background: #000;
            color: #fff;
        }
        .topBlock {
            overflow: hidden;
            ul {
                margin: 0 20px;
                height: 530px;
                transform: translateY(-100%);
                animation: sliding 5s linear infinite;
                li {
                    width: 100%;
                    height: 60px;
                    background: #000;
                    color: #fff;
                }
            }
            ul:hover {
                animation-play-state: paused;
            }
            li:hover {
                cursor: pointer;
            }
            @keyframes sliding {
                from {
                    transform: translateY(-100%);
                }
                to {
                    transform: translateY(0%);
                }
            }
        }
    }
}

@media screen and(min-width: 569px) and (max-width: 756px) {
    .setting_Image {
        .banner {
            display: none;
        }
    }

    .block-message {
        height: 400px;
        flex-direction: column;

        .blockLeft {
            width: 100%;
        }

        .blockRight {
            width: 100%;
        }
    }

    .block-chart {
        height: 600px;

        flex-direction: column;
        align-items: center;

        div {
            width: 100%;
        }
    }

    .allblock-number {
        flex-direction: column;
        align-items: center;

        div {
            width: 100%;
        }
    }
}

@media screen and (max-width: 598px) {
    .pageMain {
        margin: 0 20px;

        .block-message {
            height: 600px;
            flex-direction: column;
            align-items: center;
            transform: translateY(-10%);
            .blockLeft {
                width: 100%;
                flex-direction: column;
                flex-wrap: nowrap;

                div {
                    width: 100%;
                }
            }

            .blockRight {
                width: 100%;
            }
        }

        .block-chart {
            height: 600px;
            flex-direction: column;
            align-items: center;

            div {
                width: 100%;
            }
        }

        .allblock-number {
            flex-direction: column;
            align-items: center;
            height: 1200px;
            div {
                width: 100%;
                flex: 600px;
                overflow: hidden;
            }
            .seeAll {
                width: 100%;
            }
        }
    }

    .setting_Image {
        // padding-top: 60px;
        .banner {
            display: none;
        }

        .inputVal {
            margin: 0 20px;
        }
    }
}
::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}
.blockHeight {
    cursor: pointer;
}
</style>
