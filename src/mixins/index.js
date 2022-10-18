
import { copy, toMoney, sliceAddress, timeStamp, jetlag } from "@/utils/common.js";
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
      copy(val, this.languagePack.prompttext09);
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
      if (path === '/hash_detail') {
        this.$router.replace({ query: { hash: JSON.stringify(hash) } }).catch(e => { })
        return
      }
      this.$router.push({ name: 'hash_detail', query: { hash: JSON.stringify(hash) } }).catch(e => { })
    },
    queryDealtoAddress(address,noquery) {
      if (this.$route.path == '/hash_detail') {
        return this.$router.push({ path: '/address_detail', query: { address } }).catch(e => { })
      }
      this.$router.push({ path: '/address_detail', query: { address,noquery } }).catch(e => { })
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
  computed: {
    languagePack() {
      return this.$store.state.Language
    },
    TimeStamp() {
      return function (value,newTime) {
        
        let nowTime = Date.parse(new Date(newTime)) || Date.parse(new Date())
        let oldTime = Date.parse(new Date(value))
        let times = (nowTime - oldTime) / 1000
        if (times < 60) {
          return (times>0?times:1) + this.languagePack.timetext01
        } else if (times > 60 && times < 3600) {
          return Math.trunc(times / 60) + this.languagePack.timetext02
        } else if (times > 3600 && times < (3600 * 24)) {
          return Math.trunc(times / 3600) + this.languagePack.timetext03
        } else if (times > (3600 * 24)) {
          return Math.trunc(times / (3600 * 24)) + this.languagePack.timetext04
        }
      }
    },
    dealwithTime() {
      return function (time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let hours = date.getHours()<10? '0' + date.getHours() : date.getHours()
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        let seconds = date.getSeconds()<10? '0' +date.getSeconds() :date.getSeconds()
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      }
    }
  }
};

