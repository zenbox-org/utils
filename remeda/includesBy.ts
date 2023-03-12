import { BiFilter } from '../../generic/models/Filter'

export const includesBy = <T>(filter: BiFilter<T>) => (array: T[]) => (value: T) => !!array.find(v => filter(v, value))
