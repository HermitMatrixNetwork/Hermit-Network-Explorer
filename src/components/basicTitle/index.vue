<template>
  <div class="main" :style="basicStyle">
    <h3 class="title">{{ title }}</h3>
    <div class="message">
        <slot name="message"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    basicStyle:Object
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #ffffff;
  width: 100%;
  border: 1px solid #e9eaef;
  box-shadow: 0 4px 24px 0 rgba(93, 102, 138, 0.08);
  border-radius: 4px;
  .title {
    height: 52px;
    box-shadow: inset 0 -1px 0 0 #e9eaef;
    font-weight: bold;
    font-size: 14px;
    color: rgba(20, 37, 62, 0.85);
    letter-spacing: 0;
    line-height: 52px;
    padding-left: 16px;
  }

  .message{
    padding: 16px;
  }
}
</style>
