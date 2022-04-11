import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { URequestInterceptors, URequestConfig } from './type'
import { ElLoading, ElNotification } from 'element-plus'

const SHOW_LOADING_DEFAULT_STATUS = false

class URequest {
  instance: AxiosInstance
  showLoading?: boolean
  interceptors?: URequestInterceptors
  loadingInstance?: any // 这个loadingInstance我不知道类型
  constructor(config: URequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading || SHOW_LOADING_DEFAULT_STATUS
    this.interceptors = config.interceptors

    // 从config 中取出的对应实例拦截器（主要是在多套接口的时候有用，
    // 可以实例化2个URequest, 这样就会有2套拦截）
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器请求')

        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: '加载中，请稍后',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loadingInstance?.close()

        // return res.data
        const data = res.data

        // 处理写接口的开发人员的接口报的错，一般会有个规范的
        if (res.data.error === '-1001') {
          ElNotification({
            title: '错误',
            message: '接口报错啦',
            type: 'error'
          })
        } else {
          return data
        }
      },
      (error) => {
        console.log(error)
        this.loadingInstance?.close()
        // 处理服务器的错误，一般有404,500之类的
        if (error.response.status === 404) {
          console.log('404的错误')
        }
        // if (error.response.status === 401) {
        //   console.log('登录失效')
        // }
        if (error.response.status === 500) {
          console.log('服务器内部错误')
        }
        return error
      }
    )
  }

  request<T>(config: URequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //  如果单个接口需要做某些特别的拦截 ，就用到了这个
      config = config.interceptors?.requestInterceptor
        ? config.interceptors.requestInterceptor(config)
        : config

      // 每个请求设置showLoading 属性
      this.showLoading = config.showLoading
        ? config.showLoading
        : SHOW_LOADING_DEFAULT_STATUS

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对单个接口响应值做一些特别的拦截

          res = config.interceptors?.responseInterceptor
            ? config.interceptors.responseInterceptor(res)
            : res
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  get<T>(config: URequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: URequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: URequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: URequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default URequest
