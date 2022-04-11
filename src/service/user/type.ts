export interface IAccount {
  account: string
  password: string
}

export interface ILoginData {
  token: string
}

export interface IData<T = any> {
  data: T
  extra: any
  msg: string
}

// 空对象
export interface IEmptyObject {
  [key: string]: any
}

export interface IMenuData {
  page: number
  pageSize?: number
}
