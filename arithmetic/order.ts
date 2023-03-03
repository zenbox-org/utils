import { isDefined } from 'remeda'
import { Arithmetic, BooleanBinaryOperation } from '../arithmetic'

export const findIndexByOp = <N>(op: BooleanBinaryOperation<N>) => (values: N[]) => {
  for (let i = 1; i < values.length; i++) {
    if (op(values[i - 1], values[i])) {
      return i
    }
  }
}

export const isAscending = <N>(a: Arithmetic<N>) => (values: N[]) => !isDefined(findIndexByOp(a.gt)(values))

export const isDescending = <N>(a: Arithmetic<N>) => (values: N[]) => !isDefined(findIndexByOp(a.lt)(values))

export const isAscendingStrict = <N>(a: Arithmetic<N>) => (values: N[]) => !isDefined(findIndexByOp(a.gte)(values))

export const isDescendingStrict = <N>(a: Arithmetic<N>) => (values: N[]) => !isDefined(findIndexByOp(a.lte)(values))
