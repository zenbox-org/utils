import { getArrayComparisons } from '../arithmetic/order'
import { DateBasicArithmetic } from './DateBasicArithmetic'

export const DateArrayComparisons = getArrayComparisons(DateBasicArithmetic)

export const { isAscending, isDescending, isAscendingStrict, isDescendingStrict } = DateArrayComparisons
