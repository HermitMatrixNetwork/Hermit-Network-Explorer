
import { copy, toMoney, sliceAddress } from "@/utils/common.js";
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
      this.$router.push({ path }).catch(e => { });
    },
    messageBox(message, type = "warning") {
      if (this.num > 3) {
        //当提示框同时出现数量大于4的时候清楚全部
        Message.closeAll();
        this.num = 0;
      }
      this.num++;
      Message({
        type,
        message,
        offset: 80,
      });
    },
    queryDealtoHash(hash, index) {
      // this.$router.push({path:'/hash_detail',query:{hash}})
      // console.log(hash,index);
      this.$router.push({ name: 'hash_detail', params: { hash, index } })
    },
    queryDealtoAddress(address) {
      this.$router.push({ path: '/address_detail', query: { address } })
    }
  },
  filters: {
    toMoney,
    sliceAddress,
  },
};

