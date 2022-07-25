<template>
  <div class="main">
    <h3 class="title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #ffffff;
  width: 1280px;
  padding: 16px;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;
  .title {
    width: 1280px;
    height: 52px;
    box-shadow: inset 0 -1px 0 0 #e9eaef;
  }
}
</style>
