/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const VUE_APP_BASE_URL: string
declare const VUE_APP_BASE_NAME: string

// 没有这个申明，在template中使用$store会报错
declare let $store: any
