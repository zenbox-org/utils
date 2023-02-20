import { ensureByIndex } from '../ensure'

export type NonEmptyArray<T> = [T, ...T[]]

export const ensureNonEmptyArray = <T>(array: T[]): NonEmptyArray<T> => {
  return [ensureByIndex(array, 0), ...array.slice(1)]
}
