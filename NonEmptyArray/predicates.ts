import { NonEmptyArray } from './index'

export const isNonEmptyArray = <T>(array: T[]): array is NonEmptyArray<T> => {
  return array.length > 0
}
