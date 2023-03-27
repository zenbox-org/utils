import { Filter } from '../../generic/models/Filter'
import { all } from './all'

export const every = <T>(filter: Filter<T>) => (array: T[]) => array.every(filter)

export const everyTrue = all
