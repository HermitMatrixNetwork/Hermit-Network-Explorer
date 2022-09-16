import {contractEn,contractCn,contractCt} from './contract'
import {accountEn,accountCn,accountCt} from './account'
import {validationEn,validationCn,validationCt} from './validation'
import {blockchainEn,blockchainCn,blockchainCt} from './blockchain'
import {moreEn,moreCn,moreCt} from './more'
import { homeEn,homeCn,homeCt } from './home'

let prompt = {
    En:{
        'prompttext01':'Under development',
        'prompttext02':'success',
        'prompttext03':'fail',
        'prompttext04':'Successfully switched over',
        'prompttext05':'Transaction failure',
        'prompttext06':'Input cannot be empty!',
        'prompttext07':'Search not found',
        'prompttext08':'back home',
        'prompttext09':'Copy successfully!',
        'prompttext10':'Check the details',
    },
    Cn:{
        'prompttext01':'暂未开放',
        'prompttext02':'成功',
        'prompttext03':'失败',
        'prompttext04':'切换成功',
        'prompttext05':'交易失败',
        'prompttext06':'输入不能为空!',
        'prompttext07':'查询失败',
        'prompttext08':'返回首页',
        'promottext09':'复制成功!',
        'prompttext10':'查看详情',

    },
    Ct:{
        'prompttext01':'暫未開放',
        'prompttext02':'成功',
        'prompttext03':'失敗',
        'prompttext04':'切換成功',
        'prompttext05':'交易失敗',
        'prompttext06':'輸入不能為空!',
        'prompttext07':'查询失败',
        'prompttext08':'返回首页',
        'promottext09':'復制成功!',
        'prompttext10':'查看詳情',

    }
}
let time = {
    En:{
        'timetext01':' secs ago',
        'timetext02':' mins ago',
        'timetext03':' h ago',
        'timetext04':' day ago',
    },
    Cn:{
        'timetext01':' 秒 前',
        'timetext02':' 分钟 前',
        'timetext03':' 小时 前',
        'timetext04':' 天 前',
    },
    Ct:{
        'timetext01':' 秒 前',
        'timetext02':' 分钟 前',
        'timetext03':' 小時 前',
        'timetext04':' 天 前',
    }
}

export const Language = [
    //English
    {
        /* 首页 */
        ...homeEn,

        /* 合约 */
        ...contractEn,

        /* 账户 */
        ...accountEn,

        /* 验证节点 */
        ...validationEn,

        /* 区块链 */
        ...blockchainEn,

        /* 更多 */
        ...moreEn,
        ...prompt.En,
        ...time.En
    },
    //中文简体
    {
        /* 首页 */
       ...homeCn,

        /* 合约 */
        ...contractCn,

        /* 账户 */
        ...accountCn,

        /* 验证节点 */
        ...validationCn,

        /* 区块链 */
        ...blockchainCn,

         /* 更多 */
         ...moreCn,
        ...prompt.Cn,
        ...time.Cn


    },
    //中文繁体
    {
        ...homeCt,
        ...contractCt,
        ...accountCt,
        ...validationCt,
        ...blockchainCt,
        ...moreCt,
        ...prompt.Ct,
        ...time.Ct
    }
]