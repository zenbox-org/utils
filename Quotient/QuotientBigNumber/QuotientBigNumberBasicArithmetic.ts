import { BigNumberBasicArithmetic } from '../../BigNumber/BigNumberBasicArithmetic'
import { getQuotientBasicArithmetic } from '../getQuotientBasicArithmetic'

export const QuotientBigNumberBasicArithmetic = getQuotientBasicArithmetic(BigNumberBasicArithmetic)

export const { zero, one, fromNumber, add, sub, mul, div, mod, min, max, abs, sqrt, eq, lt, gt, lte, gte } = QuotientBigNumberBasicArithmetic
