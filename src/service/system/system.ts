// import uRequest from '@/service/request'
import uRequest from '../index'
import { IDataType } from '../type'

export function getPageListData(
  url: string,
  queryInfo: any
): Promise<IDataType> {
  return uRequest.get<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(
  url: string,
  queryInfo: any
): Promise<IDataType> {
  return uRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
