import type { Module } from 'vuex'

import { IRootState } from '../type'

import { ILoginState } from './type'
import type { IAccount } from '@/service/user/type'
import {
  accountLogin,
  queryMerchantDetail,
  queryUserMenu
} from '@/service/user/user'
import localStorage from '@/utils/localStorage'
import { mapMenuToRoutes, mapMenusToRights } from '@/utils/map-menus'
import router from '@/router'

// 约束这个state的
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    token: localStorage.get('token') || '',
    userInfo: localStorage.get('userInfo') || {},
    userMenus: localStorage.get('userMenus') || [],
    permissions: []
  },
  mutations: {
    changeToken(state, payload) {
      state.token = payload
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload) {
      state.userMenus = payload
      const routes = mapMenuToRoutes(payload)
      routes.forEach((route) => {
        // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E6%B7%BB%E5%8A%A0%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1
        // 就是给name为Main这个父级路由的children里加入一个个route对象
        router.addRoute('Main', route)
      })

      state.permissions = mapMenusToRights(payload)
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 执行登录接口
      const { data: loginRes } = await accountLogin(payload)
      commit('changeToken', loginRes.token)
      localStorage.set('token', loginRes.token)
      // 查询用户信息接口
      const { data: userInfo } = await queryMerchantDetail({})

      commit('changeUserInfo', userInfo[0])
      localStorage.set('userInfo', userInfo[0])

      // 查询用户菜单
      const { data: menuRes } = await queryUserMenu({ page: 1 })
      commit('changeUserMenus', menuRes.list)
      localStorage.set('userMenus', menuRes.list)
      // 跳转页面
      router.push('/main')
    },
    // 如果页面刷新
    loadLocalLogin({ commit }) {
      // 判断一下本地有没有token
      const token = localStorage.get('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localStorage.get('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localStorage.get('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  modules: {}
}

export default loginModule
