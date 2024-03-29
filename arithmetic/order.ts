import { isDefined } from 'remeda'
import { BasicArithmetic, BooleanBinaryOperation } from '../arithmetic'

export const findIndexByOp = <N>(op: BooleanBinaryOperation<N>) => (values: N[]) => {
  for (let i = 1; i < values.length; i++) {
    const prev = values[i - 1]
    const curr = values[i]
    if (isDefined(prev) && isDefined(curr) && op(prev, curr)) {
      return i
    }
  }
  return undefined
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
