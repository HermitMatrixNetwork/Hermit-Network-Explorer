import {contractEn,contractCn} from './contract'
import {accountEn,accountCn} from './account'
import {validationEn,validationCn} from './validation'
import {blockchainEn,blockchainCn} from './blockchain'
export const Language = [
    {
        /* 首页 */
        Home: 'Home',
        blockchain: 'blockchain',
        TopAccounts: 'Top Accounts',
        viewTransactions: 'view transactions',
        viewBlock: 'view block',
        SearchBox: 'Search by Token/hash/address/block',
        contract: 'contract',
        account: 'account',
        Validators: 'Validators',
        Resources: 'Resources',
        Whitepaper: 'Whitepaper',
        developerApi: 'developer api',
        SDKdownload: 'SDK download',
        Tendermint: 'Tendermint',
        IBC: 'IBC',
        contractCompiler: 'contract compiler',
        more: 'more',
        GovernableParameter: 'Governable Parameter',
        DAOfundationAddress: 'DAO fundation address',
        SubmitApplicattion: 'Submit Applicattion',
        RPCInformation: 'RPC information',
        faucet: 'faucet',
        logIn: 'log in',
        MainNet: 'Main Net',
        TestNet: 'Test Net',
        BlockExplorer: 'Block Explorer',
        Filter: 'Filter',
        address: 'address',
        Tokens: 'Tokens',
        Hash: 'Hash',
        BlockHeight: 'Block Height',

        //实时价格展示
        Price: 'Price   ',
        transactionVolume: 'transaction volume ',

        LiveBlocktimes: 'Live Block times',
        LiveTranransactions: 'Live Tranransactions',

        //基本信息展示
        Liveblockheight: 'Live block height',
        Liveblocknodes: 'Live block nodes',
        accumulatedtradingvolume: 'accumulated trading volume',
        AverageTPSWithin10S: 'Average TPS Within 10S/Highest TPS',
        CirculatingTotalSupply: 'Circulating/Total Supply',
        StakingRate: 'Staking Rate',
        LiveAddress: 'Live Address',

        //实时出块列表
        LiveBlock: 'Live Block',
        proposer: 'proposer',
        transactions: 'transactions',
        xsecondsago: ' seconds ago',
        AllBlocks: 'All Blocks',

        //验证节点列表
        ElectedValidators: 'Elected Validators',
        TotalStakes: 'Total Stakes',
        ValidatorYield: 'Validator Yield',
        Rankx: 'Rank x',
        AllValidators: 'All Validators',

        /* 合约 */
        ...contractEn,

        /* 账户 */
        ...accountEn,

        /* 验证节点 */
        ...validationEn,

        /* 区块链 */
        ...blockchainEn
    },
    {
        /* 首页 */
        Home: '首页',
        blockchain: '区块链',
        TopAccounts: '顶级账户',
        viewTransactions: '查看交易',
        viewBlock: '查看区块',
        SearchBox: '搜索Token/hash/adreess/block',
        contract: '合约',
        account: '账户',
        Validators: '验证节点',
        Resources: '资源',
        Whitepaper: '白皮书',
        developerApi: '开发者api',
        SDKdownload: 'SDK 下载',
        Tendermint: 'Tendermint',
        IBC: 'IBC',
        contractCompiler: '合约编译器',
        more: '更多',
        GovernableParameter: 'DAO可治理参数',
        DAOfundationAddress: 'DAO基金会地址',
        SubmitApplicattion: '提交上币申请',
        RPCInformation: 'RPC信息',
        faucet: '水龙头',
        logIn: '登录',
        MainNet: '主网络',
        TestNet: '测试网络',
        BlockExplorer: '隐士区块浏览器',
        Filter: '所有过滤条件',
        address: '地址',
        Tokens: '货币',
        Hash: '哈希',
        BlockHeight: '区块号',

        Price: 'GHM价格',
        transactionVolume: '交易总额',

        LiveBlocktimes: '实时出块时长（s）',
        LiveTranransactions: '实时区块交易数',

        //基本信息展示
        Liveblockheight: '当前区块高度',
        Liveblocknodes: '当前出块节点',
        accumulatedtradingvolume: '累计交易笔数',
        AverageTPSWithin10S: '10秒内平均TPS/瞬时最高TPS',
        CirculatingTotalSupply: '流通量/总发行量',
        StakingRate: '质押率',
        LiveAddress: '地址数',

        //实时出块列表
        LiveBlock: '实时出块区块',
        proposer: '提案人',
        transactions: '交易数',
        xsecondsago: ' 秒前',
        AllBlocks: '查看所有区块',

        //验证节点列表
        ElectedValidators: '当前验证节点',
        TotalStakes: '总质押',
        ValidatorYield: ' x%年化率',
        Rankx: ' 排名x',
        AllValidators: '查看所有验证节点',

        /* 合约 */
        ...contractCn,

        /* 账户 */
        ...accountCn,

        /* 验证节点 */
        ...validationCn,

        /* 区块链 */
        ...blockchainCn
    }
]