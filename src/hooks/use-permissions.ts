import { useStore } from '@/store'
export function usePermissions(
  pageName: string,
  permissionName: string
): boolean {
  const store = useStore()
  const permissions = store.state.login.permissions.map(
    (item: any) => item.name
  )
  console.log(`${pageName}.${permissionName}`)
  return !!permissions.find(
    (item: string) => item === `${pageName}.${permissionName}`
  )
}
