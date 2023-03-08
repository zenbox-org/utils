import { ComparatorBoolean } from '../comparator'

export const includesBy = <T>(comparator: ComparatorBoolean<T>) => (array: T[]) => (value: T) => !!array.find(v => comparator(v, value))
