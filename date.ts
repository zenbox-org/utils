import { DateTime } from 'luxon'
import { LocaleOptions } from 'luxon/src/datetime'
import { day } from './duration'
import { roundDownBy } from './number/utils'
// import './luxon-business-days'
// import { DateTime as DateTimeBusiness } from 'luxon-business-days'

export type MaybeDate = Date | undefined

export type DateLike = Date | string | number

export type Milliseconds = number

export interface WithDate { date: Date }

export const MAX_DATE = new Date(8640000000000000)

export const MIN_DATE = new Date(-8640000000000000)

export const already = new Date(0)

export const equal = (a: Date, b: Date) => a.getTime() === b.getTime()

export const yesterday = (now: Date) => new Date(now.getTime() - day)

export const yesterdayT = (now: Date) => truncate(day)(yesterday(now))

export const add = (date: Date, duration: Milliseconds) => new Date(date.getTime() + duration)

export const sub = (date: Date, duration: Milliseconds) => new Date(date.getTime() - duration)

export function timeBetween(fromHour: number, toHour: number, date: Date) {
  const { hour } = DateTime.fromJSDate(date, { zone: 'UTC' })
  return hour >= fromHour && hour < toHour
}

export const truncate = (duration: Milliseconds) => (date: Date) => new Date(roundDownBy(date.getTime(), duration))

// export function addBusiness(date: Date, duration: Duration) {
//   return DateTimeBusiness.fromJSDate(date).plusBusiness(duration).toJSDate()
// }

export const byDate = (a: WithDate, b: WithDate) => a.date.getTime() - b.date.getTime()

export const toSecondsN = (timestamp: number) => Math.trunc(timestamp / 1000)

export const toSeconds = (date: Date) => toSecondsN(date.getTime())

export const format = (fmt: string, opts?: LocaleOptions) => (date: Date) => DateTime.fromJSDate(date).toFormat(fmt, opts)

export const toISODate = (date: Date) => DateTime.fromJSDate(date).toISODate()
