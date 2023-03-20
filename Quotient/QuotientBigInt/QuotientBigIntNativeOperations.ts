import { BigIntBasicArithmetic } from '../../bigint/BigIntBasicArithmetic'
import { getNativeOperations } from '../getNativeOperations'

export const QuotientBigIntNativeOperations = getNativeOperations(BigIntBasicArithmetic)

export const { setDenominator } = QuotientBigIntNativeOperations
