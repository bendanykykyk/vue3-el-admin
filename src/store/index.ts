import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import loginModule from './login/login'
import systemModule from './main/system/system'
import { getPageListData } from '@/service/system/system'
import { IPageListParams } from '@/service/system/type'
// 约束这个state的
const store = createStore<IRootState>({
  state: {
    name: 'yuuki',
    age: 18,
    entireDepartments: [],
    entireDuties: []
  },
  mutations: {
    changeEntireDepartment(state, list: any[]) {
      state.entireDepartments = list
    },
    changeEntireDuty(state, list: any[]) {
      state.entireDuties = list
    }
  },
  actions: {
    async getEntireDataAction({ commit }, payload: IPageListParams) {
      const pathName = payload.pathName!
      const url = `/api/${pathName}/query`
      const {
        data: { list }
      } = await getPageListData(url, payload.queryInfo)

      const upperCaseDataName =
        pathName.slice(0, 1).toUpperCase() + pathName.slice(1)
      commit(`changeEntire${upperCaseDataName}`, list)
    }
  },
  modules: {
    login: loginModule,
    system: systemModule
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
