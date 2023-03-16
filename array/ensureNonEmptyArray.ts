import { ensureByIndex } from '../ensure'

export type NonEmptyArray<T> = [T, ...T[]]

export const isNonEmptyArray = <T>(array: T[]): array is NonEmptyArray<T> => {
  return array.length > 0
}

export const ensureNonEmptyArray = <T>(array: T[]): NonEmptyArray<T> => {
  return [ensureByIndex(array, 0), ...array.slice(1)]
}
