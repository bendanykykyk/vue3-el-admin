// 统一的出口
import URequest from './request'
import { Base64 } from 'js-base64'
import localStorage from '@/utils/localStorage'
const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
const TIME_OUT = 10000

// function baseFun() {
//   const token = getToken()
//   const base64 = Base64.encode(token + ':')
//   return 'Basic ' + base64
// }
// 创建一个实例，对基本项进行统一
const uRequest = new URequest({
  baseURL: VUE_APP_BASE_URL,
  timeout: TIME_OUT,
  // 统一的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      let token = ''
      let base64 = ''
      try {
        token = localStorage.get('token')
        base64 = Base64.encode(token + ':')
      } catch (error) {
        console.log(error)
      }

      // 这一行解决报错
      config.headers = config.headers ? config.headers : {}
      config.headers.Authorization = token ? `Basic ${base64}` : ''
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default uRequest
