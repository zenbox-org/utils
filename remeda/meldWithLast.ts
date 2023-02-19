import { last } from 'remeda'

export const meldWithLast = <T>(add: (a: T, b: T) => T, zero: T) => (array: T[]): T[] => array.reduce((memo: T[], value: T) => {
  return memo.concat([add(value, last(memo) || zero)])
}, [])
