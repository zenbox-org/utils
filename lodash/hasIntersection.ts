import { intersection } from 'remeda'

export function hasIntersection<T>(arr1: readonly T[], arr2: readonly T[]) {
  return intersection(arr1, arr2).length !== 0
}
