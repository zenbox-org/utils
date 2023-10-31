import { ensureByIndex } from '../ensure'
import { NonEmptyArray } from './index'

export const ensureNonEmptyArray = <T>(array: T[]): NonEmptyArray<T> => {
  return [ensureByIndex(array, 0), ...array.slice(1)]
}
