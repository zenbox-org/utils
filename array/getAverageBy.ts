import { sum } from 'lodash-es'
import { Mapper } from '../../generic/models/Mapper'

export const getAverageBy = <Val>(mapper: Mapper<Val, number>) => (array: Val[]) => sum(array.map(mapper)) / array.length
