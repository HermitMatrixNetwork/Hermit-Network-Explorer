import service1 from "./request1"

export function getContract(limit) {
    return service1({
        url: '/api/browser/contractlist',
        method: 'post',
        data: {
            chain_id: "ghmdev",
            index: '',
            limit
        }
    })
}





