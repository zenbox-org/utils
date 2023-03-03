import { Mapper } from '../../generic/models/Mapper'
import { OutputComparator } from '../comparator'
import { Numeral } from './types'

export const compareNumerals = <T extends Numeral>(a: T, b: T): OutputComparator => (a < b) ? -1 : ((a > b) ? 1 : 0)

export const compareNumeralsBy = <T, Num extends Numeral>(mapper: Mapper<T, Num>) => (a: T, b: T) => compareNumerals(mapper(a), mapper(b))
