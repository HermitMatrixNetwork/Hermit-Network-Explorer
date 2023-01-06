<template>
  <div class="rpc">
    <div class="rpcmain">
      <div class="rpcmain-box">
        <div class="hint">
          {{ languagePack.RPCtext07 }}
        </div>
        <div class="step">
          <el-steps :active="active">
            <el-step>
              <div class="stepTitle" slot="title">
                {{ languagePack.RPCtext08 }}
              </div>
            </el-step>
            <el-step>
              <div class="stepTitle" slot="title">
                {{ languagePack.RPCtext09 }}
              </div>
            </el-step>
            <el-step>
              <div class="stepTitle" slot="title">
                {{ languagePack.RPCtext10 }}
              </div>
            </el-step>
          </el-steps>
        </div>
        <BasicTitle :title="languagePack.RPCtext01">
          <template #message>
            <div class="messageBasic">
              <div class="prompt">
                <img
                  src="@/assets/img/Close-Circle-Fill@2x.png"
                  alt=""
                  width="12"
                />
                {{ languagePack.RPCtext11 }}
              </div>
              <div class="column">
                <p>{{ languagePack.RPCtext02 }}：</p>
                <span>https://rpc.hermit.network:9191</span>
              </div>
              <div class="column">
                <p>{{ languagePack.RPCtext03 }}：</p>
                <span>Hermit</span>
              </div>
              <div class="column">
                <p>{{ languagePack.RPCtext04 }}：</p>
                <span>GHM</span>
              </div>
              <div class="column">
                <p>{{ languagePack.RPCtext05 }}：</p>
                <span>https://scan.hermit.network/</span>
              </div>

              <button class="submit" @click="submit">
                {{ languagePack.RPCtext06 }}
              </button>
            </div>
          </template>
        </BasicTitle>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      active: 1,
      chainId: "Hermit", //cosmoshub-5
    };
  },
  async mounted() {},
  methods: {
    async submit() {
      if (!window.keplr) {
        return this.messageBox(this.languagePack.RPCtext11, "error");
      }
      await window.keplr.experimentalSuggestChain({
        chainId: "Hermit",
        chainName: "HermitChain",
        rpc: "https://rpc.hermit.network:26657",
        rest: "https://rpc.hermit.network:1317",
        bip44: {
          coinType: 928,
        },
        bech32Config: {
          bech32PrefixAccAddr: "ghm",
          bech32PrefixAccPub: "ghm" + "pub",
          bech32PrefixValAddr: "ghm" + "valoper",
          bech32PrefixValPub: "ghm" + "valoperpub",
          bech32PrefixConsAddr: "ghm" + "valcons",
          bech32PrefixConsPub: "ghm" + "valconspub",
        },
        currencies: [
          {
            coinDenom: "GHM",
            coinMinimalDenom: "ughm",
            coinDecimals: 6,
            coinGeckoId: "ghmdev",
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "GHM",
            coinMinimalDenom: "ughm",
            coinDecimals: 6,
            coinGeckoId: "ghmdev",
            gasPriceStep: {
              low: 0.0125,
              average: 0.025,
              high: 0.04,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: "GHM",
          coinMinimalDenom: "ughm",
          coinDecimals: 6,
          coinGeckoId: "ghmdev",
        },
      });
      // console.log(keplr.experimentalSuggestChain);
      keplr.enable(this.chainId);
      const offlilneSigner = getOfflineSigner(this.chainId);
      //   console.log(offlilneSigner);

      offlilneSigner.getAccounts().then((accounts) => {
        //getAccounts方法用来获取账户地址以及公钥
        console.log("获取到keplr钱包的账户地址及公钥", accounts);
        if (accounts) {
          let timer = setInterval(() => {
            this.active++;
          }, 500);
          if ((this.active = 3)) clearInterval(timer);
        }
      });
      
    },
  },
  computed: {
    languagePack() {
      return this.$store.state.Language;
    },
  },
};
</script>

<style lang="scss" scoped>
.rpc {
  width: 100vw;
  min-height: calc(100vh - 110px - 210px);
}
.rpcmain {
  width: 632px;
  height: 500px;
  margin: auto;
  margin-top: 64px;
  margin-bottom: 141px;
  &-box {
    .hint {
      height: 34px;
      font-weight: 400;
      font-size: 12px;
      color: #86909c;
    }
  }
}
::v-deep .step {
  height: 32px;
  margin: 24px 64px 48px 0;
  .stepTitle {
    position: absolute;
    top: 0;
    left: 36px;
    height: 32px;
    line-height: 32px;
    background: #f8fafb;
    font-weight: bold;
    font-size: 16px;
    color: rgba(20, 37, 62, 0.85);
    white-space: nowrap;
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
    width: 632px;
    left: -17px;
    height: 32px;
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
  height: 272px;
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

@media screen and (max-width: 598px) {
  .rpcmain {
    width: 100%;
    padding: 10px;
  }
  .prompt {
    width: calc(100vw - 20px) !important;
  }
}
</style>
