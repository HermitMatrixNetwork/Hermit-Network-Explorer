
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
      copy(val,this.languagePack.prompttext09);
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
      let path = this.$route.path
      if(path==='/hash_detail'){
        this.$router.replace({ query: { hash:JSON.stringify(hash)}}).catch(e => { })
        return 
      }
      this.$router.push({ name: 'hash_detail', query: { hash:JSON.stringify(hash) } }).catch(e => { })
    },
    queryDealtoAddress(address) {
      if(this.$route.path == '/hash_detail'){
        return this.$router.push({ path: '/address_detail', query: { address } }).catch(e => { })
      }
      this.$router.push({ path: '/address_detail', query: { address } }).catch(e => { })
    },
    disposeTableType(arr) {
      if (!Array.isArray(arr)) return ;
      arr.forEach((item) => {
        item.targetAddress = item.targetAddress?item.targetAddress:item.message?item.message.validator_address:''
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
            item.type = "转账";
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
          case 'MsgDelegate':
            item.type = '委托';
            break
          default:
            item.type = "";
            break;
        }
      });
      // console.log(arr);
    },
    //查找块
    queryDealtoBlock(height) {
      let path = this.$route.path
      if (path === "/block_detail") {
        return this.$router.push({ query: { height, status: 0 } }).catch(e => { })
      }
      if (path === '/hash_detail') {
        return this.$router.push({ path: '/block_detail', query: { height } }).catch(e => { })
      }
      this.$router.push({ path: '/block_detail', query: { height } }).catch(e => { })
    },
    queryDealtoNode(val) {
      this.$router.push({ name: "node_detail", query: { address: val } });
    },
  },
  filters: {
    toMoney,
    sliceAddress,
    timeStamp,
    jetlag
  },
  computed:{
    languagePack(){
      return this.$store.state.Language
    },
    TimeStamp(){
      return function(value){
        var nowTime = Date.parse(new Date())
        var oldTime = Date.parse(new Date(value))
        var times = (nowTime-oldTime)/1000
        if(times<60){
          return times + this.languagePack.timetext01
        }else if(times>60&&times<3600){
          return Math.trunc(times/60) + this.languagePack.timetext02
        }else if(times>3600&&times<(3600*24)){
          return Math.trunc(times/3600) + this.languagePack.timetext03
        }else if(times>(3600*24)){
          return Math.trunc(times/(3600*24)) + this.languagePack.timetext04
        }
        
      }
    },
  }
};

