import { createStore } from 'vuex'
import { IRootState } from './type'
import loginModule from './login/login'
// 约束这个state的
const store = createStore<IRootState>({
  state: {
    name: 'yuuki',
    age: 18
  },
  mutations: {},
  actions: {},
  modules: {
    login: loginModule
  }
})

export default store
