import type { Module } from 'vuex'

import { IRootState } from '../../type'

import { ISystemState } from './type'
import type { IPageListParams } from '@/service/system/type'
import { getPageListData } from '@/service/system/system'

// 约束这个state的
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    userList: [],
    userCount: 0
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: IPageListParams) {
      const {
        data: { list, totalCount }
      } = await getPageListData(payload.url, payload.queryInfo)
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  },
  modules: {}
}

export default systemModule
