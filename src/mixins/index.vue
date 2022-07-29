<script>
import { copy } from "@/utils/common.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    Copy(val) {
      //复制
      copy(val);
    },
    toGo(path) {
      this.$router.push({ path }, () => {});
    },
    messageBox(message, type = "warning") {
      if (this.num > 3) {  //当提示框同时出现数量大于4的时候清楚全部
        Message.closeAll();
        this.num = 0
      }
      this.num++;
      Message({
        type,
        message,
        offset:80
      });
    },
  },
};
</script>

<style lang="scss">
.el-message--warning,
.el-message--error,
.el-message--info,
.el-message--success {
  background: #ffffff !important;
  border: none !important;
}
.el-message {
  padding: 8px 16px !important;
  height: 36px;
  min-width: 236px !important;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.el-message__content {
  font-weight: 400;
  font-size: 12px !important;
  color: rgba(20, 37, 62, 0.85) !important;
}
</style>
