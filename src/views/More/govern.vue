<template>
  <div class="govern">
    <div class="governMain">
      <div class="governMain-title">可治理参数</div>
      <div class="governBox">
        <div class="governBox-item" v-for="(item, index) in list" :key="index">
          <h4 class="title">{{ item.title }}</h4>
          <p class="content">{{ item.data }}</p>
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
          title: "佣金率",
          data: "佣金率的“即委托人的奖励返佣多少给到验证人；佣金率越低，对委托人越有利。",
        },
        {
          title: "治理参数名",
          data: "佣金率的“即委托人的奖励返佣多少给到验证人；佣金率越低，对委托人越有利。”佣金率的“即委托人的奖励返佣多少给到验证人；佣金率越低，对委托人越有利。”",
        },
        {
          title: "佣金率",
          data: "佣金率的“即委托人的奖励返佣多少给到验证人；佣金率越低，对委托人越有利。",
        },
        {
          title: "佣金率",
          data: "佣金率的“即委托人的奖励返佣多少给到验证人；佣金率越低，对委托人越有利。",
        },
        {
          title: "佣金率",
          data: "佣金率的“即委托人的奖励返佣多少给到验证人；佣金率越低，对委托人越有利。",
        },
        {
          title: "佣金率",
          data: "佣金率的“即委托人的奖励返佣多少给到验证人；佣金率越低，对委托人越有利。",
        },
        {
          title: "佣金率",
          data: "佣金率的“即委托人的奖励返佣多少给到验证人；佣金率越低，对委托人越有利。",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

.governMain {
  width: 1280px;
  margin: 0 auto 80px;
  &-title {
    height: 60px;
    font-weight: 500;
    font-size: 20px;
    color: rgba(20, 37, 62, 0.85);
    letter-spacing: 0;
    padding: 16px 0;
  }

  .governBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      width: 416px;
      height: 182px;
      background: #ffffff;
      border: 1px solid #e9eaef;
      box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
      border-radius: 4px;
      margin-bottom: 14px;
      padding: 24px;
      color: rgba(20, 37, 62, 0.85);
      .title {
        font-weight: 500;
        font-size: 16px;
      }

      .content {
        margin-top: 16px;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
}

@media screen and (max-width:598px) {
  .governMain{
    width: 100%;
    &-title{
      padding-left: 16px;
    }
  }
}
</style>
 