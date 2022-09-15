import axios from 'axios'
import { Loading, Message } from 'element-ui'
import { http1 } from './index'
import router from '@/router'
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
		// loading.closeLoading()
		const res = response.data
		if (res && res.code === 0) {
			return res
		} else if(res.code === 7){
			router.replace('/error_detail')
			// Message.error('查询失败')
			// return Promise.reject(res.msg)
		}
	},
	(error) => {
		console.log(error)
		const msg = error.Message !== undefined ? error.Message : ''
		Message({
			message: '网络错误' + msg,
			type: 'error',
			duration: 3 * 1000,
		})
		return Promise.reject(error)
	}
)

export default service
