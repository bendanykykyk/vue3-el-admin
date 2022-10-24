import uRequest from '../index'

import { IAccount, IData, ILoginData, IEmptyObject, IMenuData } from './type'
// 用户 账号  登录
export const accountLogin = (data: IAccount): Promise<IData> => {
  return uRequest.post<IData<ILoginData>>({
    url: '/api/user/login',
    data
  })
}

// 用户 查询商户信息
export const queryMerchantDetail = (params: IEmptyObject): Promise<IData> => {
  return uRequest.get<IData>({
    url: '/api/merchant/detail',
    params
  })
}

// 用户 查询用户 菜单
export const queryUserMenu = (params: IMenuData): Promise<IData> => {
  return uRequest.get<IData>({
    url: '/api/menu/query',
    params
  })
}
