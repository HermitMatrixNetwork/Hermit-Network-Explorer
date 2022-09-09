import {contractEn,contractCn,contractCt} from './contract'
import {accountEn,accountCn,accountCt} from './account'
import {validationEn,validationCn,validationCt} from './validation'
import {blockchainEn,blockchainCn,blockchainCt} from './blockchain'
import {moreEn,moreCn,moreCt} from './more'
import { homeEn,homeCn,homeCt } from './home'

let prompt = {
    En:{
        'prompttext01':'Not open for the time being',
        'prompttext02':'success',
        'prompttext03':'fail',
        'prompttext04':'Successfully switched over',
        'prompttext05':'Transaction failure',
        'prompttext06':'Input cannot be empty!'
    },
    Cn:{
        'prompttext01':'暂未开放',
        'prompttext02':'成功',
        'prompttext03':'失败',
        'prompttext04':'切换成功',
        'prompttext05':'交易失败',
        'prompttext06':'输入不能为空!'

    },
    Ct:{
        'prompttext01':'暫未開放',
        'prompttext02':'成功',
        'prompttext03':'失敗',
        'prompttext04':'切換成功',
        'prompttext05':'交易失敗',
        'prompttext06':'輸入不能為空!'
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
        ...prompt.En
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
        ...prompt.Cn

    },
    //中文繁体
    {
        ...homeCt,
        ...contractCt,
        ...accountCt,
        ...validationCt,
        ...blockchainCt,
        ...moreCt,
        ...prompt.Ct
    }
]