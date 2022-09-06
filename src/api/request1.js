import axios from 'axios'
import { Loading, Message } from 'element-ui'
import { http1 } from './index'
import router from '@/router'
// Loading控制器
// const loading = {
//   loadCount: 0,
//   loadingInstance: null,
//   addLoading() {
//     if (this.loadCount === 0) {
//       this.loadingInstance = Loading.service({
//         fullscreen: false,
//         lock: true,
//         text: '加载中',
//         background: 'rgba(0, 0, 0, .7)'
//       })
//     }
//     this.loadCount++
//   },
//   closeLoading() {
//     this.loadCount--
//     if (this.loadCount === 0) {
//       this.loadingInstance && this.loadingInstance.close()
//       this.loadingInstance = null
//     }
//   }
// }
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

// 防止同时弹出多个弹框
// let messageInstance = null
// const resetMessage = (options) => {
//   if (messageInstance) {
//     messageInstance.close()
//   }
//   messageInstance = Message(options)
// }

// response 拦截器
service.interceptors.response.use(
	(response) => {
		// loading.closeLoading()
		const res = response.data
		if (res && res.code === 0) {
			return res
		} else {
			router.replace('/error_detail')
			Message.error(res.msg)
			return Promise.reject(res.msg)
		}
	},
	(error) => {
		console.log(error)
		// loading.closeLoading()
		const msg = error.Message !== undefined ? error.Message : ''
		// console.log(1111111111111);
		Message({
			message: '网络错误' + msg,
			type: 'error',
			duration: 3 * 1000,
		})
		return Promise.reject(error)
	}
)

export default service
