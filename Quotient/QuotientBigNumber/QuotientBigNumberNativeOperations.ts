import { BigNumberBasicArithmetic } from '../../BigNumber/BigNumberBasicArithmetic'
import { getNativeOperations } from '../getNativeOperations'

export const QuotientBigNumberNativeOperations = getNativeOperations(BigNumberBasicArithmetic)

export const { setDenominator } = QuotientBigNumberNativeOperations
