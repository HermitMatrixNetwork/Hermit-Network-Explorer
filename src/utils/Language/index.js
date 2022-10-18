import {contractEn,contractCn,contractCt} from './contract'
import {accountEn,accountCn,accountCt} from './account'
import {validationEn,validationCn,validationCt} from './validation'
import {blockchainEn,blockchainCn,blockchainCt} from './blockchain'
import {moreEn,moreCn,moreCt} from './more'
import { homeEn,homeCn,homeCt } from './home'
import { resourcesEn,resourcesCn,resourcesCt } from './resources'

let prompt = {
    En:{
        'prompttext01':'Under development',
        'prompttext02':'success',
        'prompttext03':'fail',
        'prompttext04':'Successfully switched over',
        'prompttext05':'Transaction failure',
        'prompttext06':'Input cannot be empty!',
        'prompttext07':'Search not found',
        'prompttext08':'Back Home',
        'prompttext09':'Copy successfully!',
        'prompttext10':'Check the details',
        'prompttext11':'No data available for the time being',
        'prompttext12':'The number of new users',
        'prompttext13':'An application has been submitted.',
        'prompttext14':'Submitted successfully',
        'prompttext15':'Yet out of the blocks',
        'submitExplain':`<h3>Submission process</h3>
        When submitting a token icon, select the token type based on the information on this page and the corresponding code compartment on Github, then submit the necessary token icons and information files. (Note: Documents containing token information cannot be passed without submitting them.) See our Gitbook Documentation guide for more information.<br>
        1. Because HermitMatrixNetwork has the highest privacy, it is not possible to know the address and hash of both parties. Viewkey information from GHB donations must be attached to the token chart when it is submitted.<br>
        2. A Github account does not allow multiple token logo applications to be submitted;<br>
        3. The number of GHB donations is 1000 and the donation address is:ghm1sndkzxws43uyqg24fgwuyvcvf28j2x5w5f0klr<br>
        4. Due to Github's openness, anyone can leave a message in the submitted order, so please do not trust any third-party person's message.<br>
        5. The token display logo only enriches the information of tokens, does not guarantee the absolute safety of tokens, nor does it represent any investment proposals of HermitMatrixNetwork. Please be aware of the risks! <br>
        <h3>How can I pass the application?</h3>
        1. There are no counterfeiting or fraudulent acts in the token items;<br>
        2. Detailed token information (necessary information such as contract address, token precision, token name, item description, contact method, etc.).<br>
        <h3>Disclaimer</h3>
        1. The HermitMatrixNetwork team allows anyone to submit a token application to the original warehouse. However, this does not mean that we have a direct partnership with all projects. _<br>
        2. After careful review, if fraudulent projects are found, the HermitMatrixNetwork team will reject them. The HermitMatrixNetwork team reserves the right to change the terms at any time due to changing market conditions, if any risk of fraud or other risk factors are found.<br>
        3. GitHub's self-submission of token icons is the only channel officially designated. Any token icons submitted through other channels will result in the deception of the HermitMatrixNetwork team.<br>
        <h3>How long does the audit take?</h3>
        1. Administrators will merge at Request after further validation. If there are any other places that need to be changed or changed, the information on the chain will be corrected. If the review fails, we will notify you by mail! _<br>
        2. After the administrator merges the Pull request, the token icon can be updated. Do not submit Pull Request again! Thank you for your patience.`,
        'prompttext16':'Please enter the correct address'
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
        'prompttext09':'复制成功!',
        'prompttext10':'查看详情',
        'prompttext11':'暂无数据',
        'prompttext12':'新增用户数',
        'prompttext13':'已经提交过申请',
        'prompttext14':'提交成功',
        'prompttext15':'暂未出块',
        'submitExplain':`<h3>提交流程</h3>
        提交代币图标时，请根据本页面信息选择代币类型并在Github上选择相应的代码仓，然后提交必要的代币图标和信息文件。（注意：如未提交代币信息文件将无法通过。）详细操作请查看我们的Gitbook文档（超链接）指引。<br>
        1、由于HermitMatrixNetwork隐私至上，无法获知交易双方地址及hash，在提交代币图表时必须附上GHB捐赠的Viewkey信息；<br>
        2、一个Github账户，不允许提交多个代币logo申请；<br>
        3、GHB捐赠数量为1000个，捐赠地址为：ghm1sndkzxws43uyqg24fgwuyvcvf28j2x5w5f0klr<br>
        4、因Github的开放性，任何人都可以在提交的订单中留言，所以请不要相信任何第三方人员的留言。<br>
        5、代币显示logo只是进行对代币的信息进行丰富，并不能保证代币的绝对安全，也不代表HermitMatrixNetwork的任何投资建议，请您注意风险!‌<br>
        <h3>如何通过申请？</h3>
        1、代币项目不存在仿冒或欺诈性行为；<br>
        2、详细的代币信息（合约地址、代币精度、代币名称、项目描述、联系方式等必要信息）。<br>
        <h3>免责声明</h3>
        1、HermitMatrixNetwork团队允许任何人向原仓库提交代币申请。 但是，这并不意味着我们与所有项目都有直接的合作关系。‌<br>
        2、经仔细审查后，如发现具有欺诈性的项目，HermitMatrixNetwork团队将予以拒绝。 由于市场状况多变，如发现任何具有欺诈风险或其他危险因素，HermitMatrixNetwork团队保留随时更改条款的权利。<br>
        3、通过GitHub自主提交代币图标为官方指定的唯一渠道，任何通过其他渠道提交的代币图标而导致受骗HermitMatrixNetwork团队概不负责。<br>
        <h3>审核时间需要多久？</h3>
        1、管理员在进一步验证后，将在Request进行合并。如果有任何其他需要或需更改的地方，将以链上信息为准进行订正，如审核不通过，我们将进行邮件通知！‌<br>
        2、管理员将Pull request合并后，代币的图标即可更新。请勿重复提交Pull Request ! 感谢你的耐心等待。`,
        'prompttext16':'请输入正确的地址'


    },
    Ct:{
        'prompttext01':'暫未開放',
        'prompttext02':'成功',
        'prompttext03':'失敗',
        'prompttext04':'切換成功',
        'prompttext05':'交易失敗',
        'prompttext06':'輸入不能為空!',
        'prompttext07':'查询失败',
        'prompttext08':'返回首頁',
        'prompttext09':'復制成功!',
        'prompttext10':'查看詳情',
        'prompttext11':'暫無數據',
        'prompttext12':'新增用戶數',
        'prompttext13':'已经提交过申请',
        'prompttext14':'提交成功',
        'prompttext15':'暫未出塊',
        'submitExplain':`<h3>提交流程</h3>
        提交代幣圖標時，請根據本頁面信息選擇代幣類型並在Github上選擇相應的代碼倉，然後提交必要的代幣圖標和信息文件。（註意：如未提交代幣信息文件將無法通過。）詳細操作請查看我們的Gitbook文檔（超鏈接）指引。<br>
        1、由於HermitMatrixNetwork隱私至上，無法獲知交易雙方地址及hash，在提交代幣圖表時必須附上GHB捐贈的Viewkey信息；<br>
        2、一個Github賬戶，不允許提交多個代幣logo申請；<br>
        3、GHB捐贈數量為1000個，捐贈地址為：ghm1sndkzxws43uyqg24fgwuyvcvf28j2x5w5f0klr<br>
        4、因Github的開放性，任何人都可以在提交的訂單中留言，所以請不要相信任何第三方人員的留言。<br>
        5、代幣顯示logo只是進行對代幣的信息進行豐富，並不能保證代幣的絕對安全，也不代表HermitMatrixNetwork的任何投資建議，請您註意風險!‌<br>
        <h3>如何通過申請？</h3>
        1、代幣項目不存在仿冒或欺詐性行為；<br>
        2、詳細的代幣信息（合約地址、代幣精度、代幣名稱、項目描述、聯系方式等必要信息）。<br>
        <h3>免責聲明</h3>
        1、HermitMatrixNetwork團隊允許任何人向原倉庫提交代幣申請。 但是，這並不意味著我們與所有項目都有直接的合作關系。‌<br>
        2、經仔細審查後，如發現具有欺詐性的項目，HermitMatrixNetwork團隊將予以拒絕。 由於市場狀況多變，如發現任何具有欺詐風險或其他危險因素，HermitMatrixNetwork團隊保留隨時更改條款的權利。<br>
        3、通過GitHub自主提交代幣圖標為官方指定的唯一渠道，任何通過其他渠道提交的代幣圖標而導致受騙HermitMatrixNetwork團隊概不負責。<br>
        <h3>審核時間需要多久？</h3>
        1、管理員在進一步驗證後，將在Request進行合並。如果有任何其他需要或需更改的地方，將以鏈上信息為準進行訂正，如審核不通過，我們將進行郵件通知！‌<br>
        2、管理員將Pull request合並後，代幣的圖標即可更新。請勿重復提交Pull Request ! 感謝你的耐心等待。`,
        'prompttext16':'請輸入正確的地址'

    }
}
let time = {
    En:{
        'timetext01':' secs ago',
        'timetext02':' mins ago',
        'timetext03':' hr ago',
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
        ...time.En,
        ...resourcesEn
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
        ...time.Cn,
        ...resourcesCn

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
        ...time.Ct,
        ...resourcesCt
    }
]