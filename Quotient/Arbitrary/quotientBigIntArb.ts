import { bigInt } from 'fast-check'
import { zero } from '../../bigint/BigIntBasicArithmetic'
import { compareNumerals } from '../../numeral/sort'
import { getQuotientArb } from './getQuotientArb'

export const quotientBigIntArb = getQuotientArb(bigInt, zero, compareNumerals)
