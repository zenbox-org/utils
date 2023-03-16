import { getSumComparators } from '../../arithmetic/getSumComparators'
import { QuotientBigIntBasicArithmetic } from './QuotientBigIntBasicArithmetic'

export const QuotientBigIntSumComparators = getSumComparators(QuotientBigIntBasicArithmetic)

export const { sumEqOne, sumLtOne, sumGtOne, sumLteOne, sumGteOne } = QuotientBigIntSumComparators
