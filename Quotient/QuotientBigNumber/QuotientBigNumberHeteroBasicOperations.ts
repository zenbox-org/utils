import { BigNumberBasicArithmetic } from '../../BigNumber/BigNumberBasicArithmetic'
import { getQuotientHeteroBasicOperations } from '../getQuotientHeteroBasicOperations'
import { QuotientBigNumberBasicArithmetic } from './QuotientBigNumberBasicArithmetic'

export const QuotientBigNumberHeteroBasicOperations = getQuotientHeteroBasicOperations(BigNumberBasicArithmetic)(QuotientBigNumberBasicArithmetic)

export const { add, sub, mul, div, mod } = QuotientBigNumberHeteroBasicOperations
