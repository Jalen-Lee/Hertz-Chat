import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

/**
 * 返回现在到当前实例的相对时间,即多久之前
 * https://day.js.org/docs/zh-CN/display/from-now
 * @param date
 * @param withoutSuffix
 */
export function timeFromNow(
  date: Date | string | number,
  withoutSuffix?: boolean | undefined,
) {
  return dayjs(date).fromNow(withoutSuffix)
}
