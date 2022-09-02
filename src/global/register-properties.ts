import { App } from 'vue'
import { formatUTCString } from '@/utils/date-format'
import { GLOBAL_FILTER_UTC_TIME } from './const'
export function registerProperties(app: App): void {
  app.provide(GLOBAL_FILTER_UTC_TIME, formatUTCString)
  // app.config.globalProperties.$filter = {
  //   formatTime: function (value: string) {
  //     return formatUTCString(value)
  //   }
  // }
}
