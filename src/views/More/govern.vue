<template>
  <div class="govern">
    <div class="governMain">
      <div class="governMain-title">{{languagePack.headertext17}}</div>
      <div class="governBox">
        <div class="governBox-item" v-for="(item, index) in list" :key="index">
          <h4 class="title">{{ item.title }}</h4>
          <p class="content" v-text="item.data"></p>
          <a href="https://hub.cosmos.network/main/governance/params-change/staking.html" target="_" class="link" v-html="item.link"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "Querying on-chain parameters",
          data: `Given a subspace and an associated key, you can query on chain parameters using the CLI.

gaiad query params subspace <subspace_name> <key> --node <node_address> --chain-id <chain_id>
          `,
          link:`For more information on specific modules, refer to the Cosmos SDK documentation on modules (opens new window).`
        },
        {
          title: "auth subspace",
          data: `Key          \t \t \t \tValue
MaxMemoCharacters\t	512
SigVerifyCostED25519\t	590
SigVerifyCostSecp256k1	1000
TxSigLimit	            \t \t7
TxSizeCostPerByte	\t \t10`,
          link:'Read more about the governance implications of the<span> auth subspace here.</span>'
        },
        {
          title: "bank subspace",
          data: `Key	\t \t \t \t\tValue
DefaultSendEnabled\t\ttrue
SendEnabled	\t \t\t[] `,
          link:'Read more about the governance implications of the <span>bank subspace here.</sapn>'
        },
        {
          title: "baseapp subspace",
          data: `Key	\t \t \t\t	Value
BlockParams\t \t \t \t{ "max_bytes": "200000", "max_gas": "40000000" }
EvidenceParams\t \t \t{ "max_age_duration": "172800000000000", "max_age_num_blocks": "1000000", "max_bytes": "50000" }
ValidatorParams       \t\t{ "pub_key_types": [ "ed25519" ] }`,
          link:'Read more about the governance implications of the <span>baseapp subspace here.</span>'
        },
        {
          title: "crisis subspace",
          data: `Key	\t\t\tValue
ConstantFee	{ "amount": "1333000000", "denom": "uatom" }`,
          link:`Read more about the governance implications of the <span>crisis subspace here.</span>`,

        },
        {
          title: "distribution subspace",
          data: `Key	Value
baseproposerreward	0.010000000000000000
bonusproposerreward	0.040000000000000000
communitytax	0.020000000000000000
withdrawaddrenabled	true`,
link:`Read more about the governance implications of the <span>distribution subspace here.</span>`
        },
        {
          title: "gov subspace",
          data: `Key	Value
depositparams	{ "max_deposit_period": "1209600000000000", "min_deposit": [ { "amount": "64000000", "denom": "uGHM" } ] }
tallyparams	{ "quorum": "0.400000000000000000", "threshold": "0.500000000000000000", "veto_threshold": "0.334000000000000000" }
votingparams	{ "voting_period": "1209600000000000" }`,
link:`Read more about the governance implications of the <span>gov subspace here.</span>`
        },
         {
          title: "liquidity subspace",
          data: `Key	\t\t\t\t\t\tValue
CircuitBreakerEnabled	\t\tfalse
InitPoolCoinMintAmount	\t\t1000000
MaxOrderAmountRatio	\t\t0.100000000000000000
MaxReserveCoinAmount	\t0
MinInitDepositAmount  \t\t\t1000000
PoolCreationFee	\t\t\t[ { "amount": "40000000", "denom": "uGHM" } ]
PoolTypes	\t\t\t\t[ { "description": "Standard liquidity pool with pool price function X/Y, ESPM constraint, and two kinds of reserve coins", "id": 1, "max_reserve_coin_num": 2, 
\t\t\t\t\t\t\t"min_reserve_coin_num": 2, "name": "StandardLiquidityPool" } ]
SwapFeeRate	\t\t\t\t0.003000000000000000
UnitBatchHeight	\t\t\t1
WithdrawFeeRate	\t\t\t0.000000000000000000`,
link:'Read more about the governance implications of the <span>liquidity subspace here.</span>'
        },
         {
          title: "mint subspace",
          data: `Key	Value
BlocksPerYear	4360000
GoalBonded	0.670000000000000000
InflationMax	0.200000000000000000
InflationMin	0.070000000000000000
InflationRateChange	1.000000000000000000
MintDenom	uatom`,
link:'Read more about the governance implications of the <span>mint subspace here.</span>'
        },
         {
          title: "slashing subspace",
          data: `Key	Value
DowntimeJailDuration	600000000000
MinSignedPerWindow	0.050000000000000000
SignedBlocksWindow	10000
SlashFractionDoubleSign	0.050000000000000000
SlashFractionDowntime	0.000100000000000000`,
link:'Read more about the governance implications of the <span>slashing subspace here.</span>'
        },
         {
          title: "staking subspace",
          data: `Key	Value
BondDenom	uatom
HistoricalEntries	10000
MaxEntries	7
MaxValidators	125
UnbondingTime	1814400000000000`,
link:'Read more about the governance implications of the <span>staking subspace here.</span>'
        },
         {
          title: "transfer subspace",
          data: `Key	Value
ReceiveEnabled	true
SendEnabled	true`,
link:'Read more about the governance implications of the <span>transfer subspace here.</span>'

        },
      ],
    };
  },
  computed:{
    languagePack(){
      return this.$store.state.Language
    }
  },
  mounted(){
    let links = document.querySelectorAll('.link > span')
    links.forEach(item=>{
      item.className = 'specialFont'
    })
  }
};
</script>

<style lang="scss" scoped>
.governMain {
  width: 1280px;
  margin: 0 auto 80px;
  &-title {
    height: 60px;
    font-weight: bold;
    font-size: 20px;
    color: rgba(20, 37, 62, 0.85);
    letter-spacing: 0;
    padding: 16px 0;
  }

  .governBox {
    width: 100%;
    display: flex;
    // flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;

    &-item {
      position: relative;
      // width: 100%;
      width: 33%;
      overflow: auto;
      // min-width: 1200px;
      height: auto;
      background: #ffffff;
      border: 1px solid #e9eaef;
      box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
      border-radius: 4px;
      margin-bottom: 14px;
      padding: 24px;
      color: rgba(20, 37, 62, 0.85);
      .title {
        font-weight: bold;
        font-size: 16px;
      }

      .content {
        margin-top: 16px;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        white-space: pre-wrap;
        background: #F7F7F7;
        border-radius: 4px;
      }

      >a{
        display: block;
        margin-top: 20px;
        font-size: 14px;
        color: rgba(20, 37, 62, 0.85);
        line-height: 22px;
      }
    }
  }
}

@media screen and (max-width: 598px) {
  .governMain {
    width: 100%;
    &-title {
      padding-left: 16px;
    }
  }
  .governBox{
    width: 100%;
    overflow-x: auto;
  }
}
</style>
