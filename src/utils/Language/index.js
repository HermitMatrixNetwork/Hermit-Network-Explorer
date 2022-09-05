import {contractEn,contractCn,contractCt} from './contract'
import {accountEn,accountCn,accountCt} from './account'
import {validationEn,validationCn,validationCt} from './validation'
import {blockchainEn,blockchainCn,blockchainCt} from './blockchain'
import {moreEn,moreCn,moreCt} from './more'

import { homeEn,homeCn,homeCt } from './home'


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
        ...moreEn
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
         ...moreCn
    },
    //中文繁体
    {
        ...homeCt,
        ...contractCt,
        ...accountCt,
        ...validationCt,
        ...blockchainCt,
        ...moreCt
    }
]