import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '@/router'
// const ConfigBaseURL = 'http://45.32.116.172:1317' //默认路径，这里也可以使用env来判断环境
const ConfigBaseURL = 'https://rpc.hermit.network:1317'
// const ConfigBaseURL = 'http://158.247.237.78:8888'
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 300000, // 请求超时时间
  baseURL: ConfigBaseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 添加请求拦截器
Service.interceptors.request.use(config => {
  return config
})

// 添加响应拦截器
Service.interceptors.response.use(response => {
  // loadingInstance.close()
  //  console.log(response)
  return response.data
}, error => {
  // console.log('error', error)
  const msg = error.message !== undefined ? error.message : ''
  // Message.closeAll()
  if(error.response.data.code === 3){
    return router.replace('/error_detail')
  }
  // Message({
  //   message: '网络错误' + msg,
  //   type: 'error',
  //   duration: 3 * 1000
  // })
  // Promise.reject(error)
  return 
})
