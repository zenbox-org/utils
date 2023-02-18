import { last } from 'remeda'

export const meldWithLast = <T>(add: (a: T, b: T) => T, zero: T) => (array: T[]) => array.reduce<T[]>((memo, value) => {
  return memo.concat([add(value, last(memo) || zero)])
}, [])
