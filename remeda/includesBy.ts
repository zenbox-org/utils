import { FilterTwo } from '../Filter'

export const includesBy = <T>(filter: FilterTwo<T>) => (array: T[]) => (value: T) => !!array.find(v => filter(v, value))
