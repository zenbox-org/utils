import { getBasicOperations } from '../arithmetic'
import { BigIntBasicArithmetic } from './BigIntBasicArithmetic'

export const BigIntBasicOperations = getBasicOperations(BigIntBasicArithmetic)

export const { sum, sumAmounts, halve, clamp, clampIn, getShare, getDeltas, getQuotientOf } = BigIntBasicOperations
