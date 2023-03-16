import { BigIntBasicArithmetic } from '../../bigint/BigIntBasicArithmetic'
import { getQuotientBasicArithmetic } from '../getQuotientBasicArithmetic'

export const QuotientBigIntBasicArithmetic = getQuotientBasicArithmetic(BigIntBasicArithmetic)

export const { zero, one, fromNumber, add, sub, mul, div, mod, min, max, abs, sqrt, eq, lt, gt, lte, gte } = QuotientBigIntBasicArithmetic
