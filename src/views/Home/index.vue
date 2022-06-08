<template>
    <div class="Home">
        <div class="bg-image">
            <div class="inputVal">
                <el-input :placeholder="Language.text01" v-model="input3" class="input-with-select">
                    <el-select v-model="select" slot="prepend">
                        <el-option :label="Language.text03" value="1"></el-option>
                        <el-option :label="Language.text04" value="2"></el-option>
                        <el-option :label="Language.text05" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="banner">
                <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" alt="">
            </div>
        </div>
        <div class="pageMain">
            <div class="block-message">
                <div class="blockLeft">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
                <div class="blockRight">
                    <div>
                        折线图
                    </div>
                </div>
            </div>
            <div class="block-chart">
                <div class="outBlockTime">
                    出块时长
                </div>
                <div class="outBlockNum">
                    出块交易数
                </div>
            </div>

            <div class="allblock-number">
                <div class="newBlock">
                    区块
                    <button>查看更多</button>
                </div>
                <div class="topBlock">
                    当选验证节点
                    <button>查看更多</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Language } from './Language'
import bar from '@/echarts/index.js'
export default {
    name: 'Home',
    data() {
        return {
            input3: '',
            select: '',
            Language: {}
        }
    },
    created() {
        const langVal = localStorage.getItem('language')
        if (langVal) {
            this.Language = Language[langVal]
        } else {
            this.Language = Language[0]
        }
    },
    mounted(){
        // bar('.blockRight')
    }
}

</script>
<style lang="scss" scoped>
.Home {
    width: 100%;
    height: 100%;
}

.bg-image {
    width: 100%;
    height: 400px;
    background: pink;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .inputVal {
        flex: 2;
        margin: 0 60px;

        .input-with-select {
            input {}
        }
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
        transform: translateY(-20%);
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
                background: yellow;
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
        background: blue;
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
            flex: 1;
            height: 100%;
            background: #999;
        }
    }
}


@media screen and(min-width: 569px) and (max-width:756px) {
    .bg-image {
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

@media screen and (max-width:568px) {
    .pageMain {
        margin: 0 20px;

        .block-message {
            height: 600px;
            flex-direction: column;
            align-items: center;

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

            div {
                width: 100%;
            }
        }
    }

    .bg-image {
        .banner {
            display: none;
        }

        .inputVal {
            margin: 0 20px;
        }
    }


}
</style>
