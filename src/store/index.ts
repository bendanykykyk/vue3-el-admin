import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import loginModule from './login/login'
import systemModule from './main/system/system'
// 约束这个state的
const store = createStore<IRootState>({
  state: {
    name: 'yuuki',
    age: 18
  },
  mutations: {},
  actions: {},
  modules: {
    login: loginModule,
    system: systemModule
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
