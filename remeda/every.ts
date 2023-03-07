import { Filter } from '../../generic/models/Filter'

export const every = <T>(filter: Filter<T>) => (array: T[]) => array.every(filter)
