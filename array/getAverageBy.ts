import { Mapper } from '../Mapper'
import { sum } from '../remeda/sum'

export const getAverageBy = <Val>(mapper: Mapper<Val, number>) => (array: Val[]) => sum(array.map(mapper)) / array.length
