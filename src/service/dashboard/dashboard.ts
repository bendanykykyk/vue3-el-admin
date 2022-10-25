import uRequest from '../index'

import { IDataType } from './type'

// 用户 查询用户 菜单
export const queryStatistics = (params: any): Promise<IDataType> => {
  return uRequest.get<IDataType>({
    url: '/api/analysis/query',
    params
  })
}
