<template>
  <div class="rpc">
    <div class="rpcmain">
      <div class="rpcmain-box">
        <div class="hint">
          用户用户可以快速添加到他们的钱包和Web3
          中间件提供商（如：Kpler）连接到正确的Chain ID 和 Network ID
          以连接到正确的链
        </div>
        <div class="step">
          <el-steps :active="active">
            <el-step>
              <div class="stepTitle" slot="title">链接钱包</div>
            </el-step>
            <el-step>
              <div class="stepTitle" slot="title">添加网络</div>
            </el-step>
            <el-step>
              <div class="stepTitle" slot="title">添加成功</div>
            </el-step>
          </el-steps>
        </div>
        <BasicTitle :title="'隐士网络'">
          <template #message>
            <div class="messageBasic">
              <div class="prompt">
                <img src="@/assets/img/Close-Circle-Fill.png" alt="" />
                请使用chrome浏览器安装Kpler进行操作。
              </div>
              <div class="column">
                <p>网络链接网址：</p>
                <span>https://xxxxx.xx.xx/rpc</span>
              </div>
              <div class="column">
                <p>链号：</p>
                <span>{{ chainId }}</span>
              </div>
              <div class="column">
                <p>符号：</p>
                <span>GHM</span>
              </div>
              <div class="column">
                <p>浏览器网址：</p>
                <span>https://xxxxx.xx.xx</span>
              </div>

              <button class="submit" @click="submit">连接到钱包</button>
            </div>
          </template>
        </BasicTitle>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/index.vue";
export default {
  mixins: [mixin],
  data() {
    return {
      active: 1,
      chainId: "cosmoshub-5",
    };
  },
  methods: {
    submit() {
      if (!window.keplr) {
        return this.messageBox("请使用chrome浏览器安装Kpler进行操作!", "error");
      }
      keplr.enable(this.chainId);

      const offlilneSigner = getOfflineSigner(this.chainId);
      //   console.log(offlilneSigner);

      offlilneSigner.getAccounts().then((accounts) => {
        //getAccounts方法用来获取账户地址以及公钥
        console.log('获取到keplr钱包的账户地址及公钥',accounts);
        if (accounts) {
          let timer = setInterval(() => {
            this.active++;
          }, 500);
          if ((this.active = 3)) clearInterval(timer);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.rpc {
  width: 100%;
}
.rpcmain {
  width: 632px;
  height: 500px;
  margin: auto;
  margin-top: 64px;
  margin-bottom: 141px;
  &-box {
    height: 360px;
    .hint {
      height: 34px;
      font-weight: 400;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.45);
    }
  }
}
::v-deep .step {
  height: 32px;
  padding: 24px 64px 48px 0;
  .stepTitle {
    position: absolute;
    top: 0;
    left: 36px;
    width: 64px;
    height: 32px;
    line-height: 32px;
    background: #f8fafb;
    font-weight: 500;
    font-size: 16px;
    color: rgba(20, 37, 62, 0.85);
  }
  .el-step__icon {
    width: 32px;
    height: 32px;
    background: #1e42ed;
    border: none;
    color: #ffffff;
  }
  .el-step__line {
    top: 16px !important;
  }
  .is-finish {
    color: #1e42ed;
    border-color: #1e42ed;
  }
}
.messageBasic {
  .prompt {
    background: #fffbe6;
    border: 1px solid #ffe58f;
    border-radius: 2px;
    position: absolute;
    top: -16px;
    width: 600px;
    left: -17px;
    height: 20px;
    padding: 8px 16px;
    font-weight: 400;
    font-size: 12px;
    color: rgba(20, 37, 62, 0.85);
    line-height: 20px;
    display: flex;
    align-items: center;
    > img {
      padding-right: 4px;
    }
  }
  position: relative;
  height: 160px;
  padding: 32px 0 80px 0;
  .submit {
    width: 128px;
    height: 32px;
    background: #1e42ed;
    border-radius: 2px;
    border: none;
    color: #ffffff;
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}
</style>
