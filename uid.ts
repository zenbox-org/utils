import { equals, pick } from 'remeda'
import { GetUid } from './zod'

// export function toUid<T>(obj: T, map: Record<keyof T, GetUid<T>>) {
//   return JSON.stringify()
// }

/**
 * An object of unknown form (possibly nested)
 */
export type Uid = unknown

// eslint-disable-next-line @typescript-eslint/ban-types
export function toUid<T extends object>(obj: T, ...keys: Array<keyof T>) {
  return pick(obj, keys)
}

export function fromUid<T>(uid: string): T {
  return JSON.parse(uid)
}

export function byUid<UidHolder, Obj extends UidHolder>(getUid: GetUid<UidHolder>, holder: UidHolder) {
  const uid = getUid(holder)
  // console.log('uid', uid)
  return function ($obj: Obj) {
    const $uid = getUid($obj)
    // console.log('$uid', $uid)
    return equals(uid, $uid)
  }
}

// export function getCompositeUid<O extends Record<string, unknown>>(object: O, map: Record<keyof O, GetUid<unknown>>) {
//   return JSON.stringify(Object.assign({}, object, { items: schedule.items.map(getScheduleItemUid) }))
// }
