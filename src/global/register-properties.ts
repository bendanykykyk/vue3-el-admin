import { App } from 'vue'
import { formatUTCString } from '@/utils/date-format'
export function registerProperties(app: App): any {
  app.config.globalProperties.$filter = {
    formatTime: function (value: string) {
      return formatUTCString(value)
    }
  }
}
