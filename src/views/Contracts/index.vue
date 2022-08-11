<template>
  <div class="contracts-main">
    <div class="main">
      <div class="title">合约</div>
      <div class="contracts_basic">
        <div class="contracts_basic_item">
          <div class="icon"></div>
          <div class="explain">
            <p>总运算次数</p>
            <h3>1,256,017</h3>
          </div>
        </div>
        <div class="contracts_basic_item">
          <div class="icon"></div>
          <div class="explain">
            <p>总用户数</p>
            <h3>51,631</h3>
          </div>
        </div>
        <div class="contracts_basic_item">
          <div class="icon"></div>
          <div class="explain">
            <p>已部署合约</p>
            <h3>$0.48</h3>
          </div>
        </div>
      </div>
      <div class="contracts_table">
        <div class="contracts_table_title">
          <p>总共 <span style="color: #5671f2">1,081,774 </span>个区块</p>
          <el-pagination small layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
        <Table />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table/index.vue";
export default {
  components: { Table },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1280px;
  margin: 0 auto;
  .title {
    padding: 16px 0;
  }

  .contracts_basic {
    width: 1280px;
    height: 128px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_item {
      height: 64px;
      padding: 32px 64px;
      flex: 1;
      display: flex;
      align-items: center;
      .explain {
        padding-left: 23px;
        p {
          height: 17px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(20, 37, 62, 0.45);
          letter-spacing: 0;
        }
        h3 {
          height: 29px;
          font-family: DIN-Bold;
          font-weight: Bold;
          font-size: 24px;
          color: rgba(20, 37, 62, 0.85);
          letter-spacing: 0;
        }
      }
      .icon {
        width: 64px;
        height: 64px;
        background-size: 100% 100%;
      }
      &:nth-child(1) {
        .icon {
          background: url("../../assets/img/contract_icon1.png");
        }
      }
      &:nth-child(2) {
        .icon {
          background: url("../../assets/img/contract_icon2.png");
        }
      }
      &:nth-child(3) {
        .icon {
          background: url("../../assets/img/contract_icon3.png");
        }
      }
    }
  }

  .contracts_table {
    width: 1280px;
    height: 776px;
    background: #ffffff;
    border: 1px solid #e9eaef;
    box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
    border-radius: 4px;

    &_title {
      height: 60px;
      padding-left: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 12px;
      color: rgba(20, 37, 62, 0.85);
      letter-spacing: 0;
    }
  }
}

@media screen and (max-width: 598px) {
  .contracts-main {
    margin: 0 10px;
  }
  .main {
    width: 100%;

    .contracts_basic {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;

      &_item {
        padding: 10px 0;
        width: 100%;
        .explain{
          padding-left: 64px;
        }
        .icon{
          margin-left: 10px;
        }
      }
    }

    .contracts_table{
      width: 100%;
    }
  }
}
</style>
