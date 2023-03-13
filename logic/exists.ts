import { Filter } from '../../generic/models/Filter'

/**
 * Can always be unfolded (= replaced with the predicate code where `value` is substituted with the actual value)
 */
export const exists = <T>(input: T, filter: Filter<T>) => filter(input)
