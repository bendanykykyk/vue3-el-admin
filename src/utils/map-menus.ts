import { RouteRecordRaw } from 'vue-router'

export function mapMenuToRoutes(userMenu: any[]): RouteRecordRaw[] {
  // 真实的动态route
  const routes: RouteRecordRaw[] = []

  // 1，默认加载所有的routes
  const allRoutes: RouteRecordRaw[] = []

  const routeFiles = require.context('../router/main', true, /\.ts/)

  // ['./main/product/product.ts']
  routeFiles.keys().forEach((path) => {
    const route = require('../router/main' + path.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2. 根据后端返回的菜单去获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.parentId !== '0') {
        const route = allRoutes.find((route) => route.path === menu.path)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenu)

  return routes
}
