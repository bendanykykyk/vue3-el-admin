import { IBreadcrumb } from '@/base-ui/breadcrumb'
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

/**
 * @description: 顶多2级菜单的转化面包屑 [{父},{子}]
 * @param {any} userMenu 菜单路由对象
 * @param {string} currentPath 当前的路由
 * @return {IBreadcrumb[]} 返回一个IBreadcrumb类型的数组
 */
// userMenus
//  [{
// 	"_id": "d4107ab16247e7030440370e5a81608c",
// 	"children": [{
// 		"children": [],
// 		"id": "m1648879734796",
// 		"name": "用户管理",
// 		"parentId": "m1648879363329",
// 		"path": "/main/user",
// 		"uid": "1646354774615"
// 	}],
// 	"id": "m1648879363329",
// 	"name": "用户管理",
// 	"parentId": "0",
// 	"path": "/user",
// 	"uid": "1646354774615"
// }
// ]
export function pathMapBreadcrumbs(
  userMenu: any[],
  currentPath: string
): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = []
  for (const parentMenu of userMenu) {
    // if(parentMenu)
    // TODO: 写完这个方法
  }
  return breadcrumbs
}
