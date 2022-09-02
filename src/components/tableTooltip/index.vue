<template>
  <el-tooltip
    effect="dark"
    :content="content"
    :placement="placement"
    :offset="offset"
    popper-class="tooltipStyle"
  >
    <div class="specialFont" :style="toolStyle">
      <slot name="icon"></slot>
      {{ content | sliceAddress }}
    </div></el-tooltip
  >
</template>

<script>
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  props: {
    content: {
      type: String,
      default: "",
    },
    placement: {
      type: String,
      default: "top",
    },
    offset:Number,
    toolStyle: Object,
  },
};
</script>

<style lang="scss">
.tooltipStyle {
  width: 186px;
  font-size: 12px;
  color: #ffffff !important;
  line-height: 20px !important;

  background: rgba(0, 0, 0, 0.75) !important;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05) !important;
  border-radius: 2px !important;
}
</style>
