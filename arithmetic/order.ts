import { isDefined } from 'remeda'
import { BasicArithmetic, BooleanBinaryOperation } from '../arithmetic'
import { BigIntBasicArithmetic } from '../bigint.arithmetic'

export const findIndexByOp = <N>(op: BooleanBinaryOperation<N>) => (values: N[]) => {
  for (let i = 1; i < values.length; i++) {
    if (op(values[i - 1], values[i])) {
      return i
    }
  }
}

export const isAscending = <N>(a: BasicArithmetic<N>) => (values: N[]) => !isDefined(findIndexByOp(a.gt)(values))

export const isDescending = <N>(a: BasicArithmetic<N>) => (values: N[]) => !isDefined(findIndexByOp(a.lt)(values))

export const isAscendingStrict = <N>(a: BasicArithmetic<N>) => (values: N[]) => !isDefined(findIndexByOp(a.gte)(values))

export const isDescendingStrict = <N>(a: BasicArithmetic<N>) => (values: N[]) => !isDefined(findIndexByOp(a.lte)(values))

export const getArrayComparisons = <N>(arithmetic: BasicArithmetic<N>) => ({
  isAscending: isAscending(arithmetic),
  isDescending: isDescending(arithmetic),
  isAscendingStrict: isAscendingStrict(arithmetic),
  isDescendingStrict: isDescendingStrict(arithmetic),
})

export const BigIntArrayComparisons = getArrayComparisons(BigIntBasicArithmetic)
