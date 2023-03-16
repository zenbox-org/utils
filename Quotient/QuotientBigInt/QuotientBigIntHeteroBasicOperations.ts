import { BigIntBasicArithmetic } from '../../bigint/BigIntBasicArithmetic'
import { getQuotientHeteroBasicOperations } from '../getQuotientHeteroBasicOperations'
import { QuotientBigIntBasicArithmetic } from './QuotientBigIntBasicArithmetic'

export const QuotientBigIntHeteroBasicOperations = getQuotientHeteroBasicOperations(BigIntBasicArithmetic)(QuotientBigIntBasicArithmetic)

export const { add, sub, mul, div, mod } = QuotientBigIntHeteroBasicOperations
