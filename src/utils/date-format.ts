const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

const DATE_TIME_FORMAT_DEFAULT = 'YYYY-MM-DD HH:mm:ss'

export function formatUTCString(
  utcString: string,
  format: string = DATE_TIME_FORMAT_DEFAULT
): any {
  return dayjs.utc(utcString).format(format)
}
