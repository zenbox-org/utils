import { IsEqual } from '../lodash'

export const startsWith = <T>(isEqual: IsEqual<T | undefined>) => (source: T[]) => (target: T[]) => {
  return target.every((value, index) => isEqual(target[index])(source[index]))
}
