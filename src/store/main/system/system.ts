import type { Module } from 'vuex'

import { IRootState } from '../../type'

import { ISystemState } from './type'
import type {
  IPageListParams,
  IDeletePageDataParams
} from '@/service/system/type'
import { getPageListData, deletePageData } from '@/service/system/system'

// 约束这个state的
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    userList: [],
    userCount: 0,
    merchantList: [],
    merchantCount: 0,
    productList: [],
    productCount: 0
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeMerchantList(state, merchantList: any[]) {
      state.merchantList = merchantList
    },
    changeMerchantCount(state, merchantCount: number) {
      state.merchantCount = merchantCount
    },
    changeProductList(state, productList: any[]) {
      state.productList = productList
    },
    changeProductCount(state, productCount: number) {
      state.productCount = productCount
    }
  },
  getters: {
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: IPageListParams) {
      const pageName = payload.pageName
      const url = `/api/${pageName}/query`
      const {
        data: { list, totalCount }
      } = await getPageListData(url, payload.queryInfo)

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageDataAction({ dispatch }, payload: IDeletePageDataParams) {
      // 调用删除
      const pageName = payload.pageName
      const url = `/api/${pageName}/query`
      await deletePageData(url, payload.queryInfo)
      // 重新查询
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  },
  modules: {}
}

export default systemModule
