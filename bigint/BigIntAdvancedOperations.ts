import { getAdvancedOperations } from '../arithmetic'
import { BigIntBasicArithmetic } from './BigIntBasicArithmetic'

export const BigIntAdvancedOperations = getAdvancedOperations(BigIntBasicArithmetic)

export const { sum, sumAmounts, halve, clamp, clampIn, getShare, getDeltas, getQuotientOf } = BigIntAdvancedOperations
