import { getSumComparators } from '../../arithmetic/getSumComparators'
import { QuotientBigNumberBasicArithmetic } from './QuotientBigNumberBasicArithmetic'

export const QuotientBigNumberSumComparators = getSumComparators(QuotientBigNumberBasicArithmetic)

export const { sumEqOne, sumLtOne, sumGtOne, sumLteOne, sumGteOne } = QuotientBigNumberSumComparators
