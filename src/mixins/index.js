
import { copy, toMoney, sliceAddress, timeStamp, jetlag } from "@/utils/common.js";
import { Message } from "element-ui";
import moment from "moment";
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
    },
    disposeTableType(arr) {
      if (!Array.isArray(arr)) return console.error('no Array');
      arr.forEach((item) => {
        switch (item.operate) {
          case "MsgExecuteContract":
            item.type = "合约执行";
            item.targetAddress = item.message.contract;
            break;
          case "MsgWithdrawDelegatorReward":
            item.type = "领取奖励";
            item.targetAddress = item.message.validator_address;
            break;
          case "MsgUndelegate":
            item.type = "取消委托";
            break;
          case "MsgBeginRedelegate":
            item.type = "赎回交易";
            break;
          case "MsgSend":
            item.type = "发送";
            item.targetAddress = item.message.to_address;
            break;
          case "MsgSetWithdrawAddress":
            item.type = "设置领奖地址";
            item.targetAddress = item.message.withdraw_address;
            break;
          case "MsgVote":
            item.type = "投票";
            break;
          case "MsgCreateValidator":
            item.type = "创建验证器";
            break;
          case "RaAuthenticate":
            item.type = "身份验证";
            break;
          case "MsgExecuteContract":
            item.type = "合约执行";
            break;
          case "MsgInstantiateContract":
            item.type = "实例化合约";
            break;
          case "MsgStoreCode":
            item.type = "上传合约";
            break;
          default:
            item.type = "";
            break;
        }
      });
      // console.log(arr);
    },
    queryDealtoBlock(height) {
      this.$router.push({ path: '/block_detail', query: { height } })
    }
  },
  filters: {
    toMoney,
    sliceAddress,
    timeStamp,
    jetlag
  },
};

