<template>
  <div>
    <main>
      <h3 class="title">验证节点</h3>

      <div class="column">
        <div class="column-item">
            节点概览
        </div>
        <div class="column-item">
            实时质押信息
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    document.querySelector("body").style.background = "#F8FAFB";
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 1280px;
  margin: 0 auto;
  .title {
    padding: 16px 0;
  }

  .column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-item {
      width: 632px;
      height: 208px;
      background: #ffffff;
      border: 1px solid #e9eaef;
      box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
      border-radius: 4px;
    }
  }
}
</style>
