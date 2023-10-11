import { getAdvancedOperations } from '../arithmetic'
import { NumberBasicArithmetic } from './NumberBasicArithmetic'

export const NumberAdvancedOperations = getAdvancedOperations(NumberBasicArithmetic)

export const { sum, sumMap, sumAmounts, halve, clamp, clampIn, getShare, getDeltas, getQuotientOf } = NumberAdvancedOperations
