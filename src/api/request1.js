import axios from 'axios'
import { Loading, Message } from 'element-ui'
import { http1 } from './index'
// 创建axios 实例
const service = axios.create({
	baseURL: '',
	timeout: 10000, // 请求超时时间
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
	},
})

// request 拦截器
service.interceptors.request.use(
	(config) => {
		// loading.addLoading()
		return config
	},
	(error) => {
		// loading.addLoading()
		Promise.reject(error)
	}
)


// response 拦截器
service.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		// console.log(error)
		if (!error.config.isError) {
			const msg = error.Message !== undefined ? error.Message : ''
			if(error.config.faucet){
				return Promise.reject(error)
			}
			Message({
				message: '网络错误' + msg,
				type: 'error',
				duration: 3 * 1000,
			})
			return Promise.reject(error)
		}else{
			return false
		}
	}
)

export default service
