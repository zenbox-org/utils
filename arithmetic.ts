import { and } from '../generic/models/Filter'
import { clamp, clampIn } from './arithmetic/clamp'
import { getDeltas } from './arithmetic/getDeltas'
import { getShare } from './arithmetic/getShare'
import { halve } from './arithmetic/halve'
import { sum, sumAmounts } from './arithmetic/sum'
import { getQuotientOf, isValidQuotientSum } from './Quotient/utils'

export type UnaryOperation<A, Out> = (a: A) => Out

export type BinaryOperationS<A, B, Out> = (a: A, b: B) => Out

export type BinaryOperationD<A, B, Out> = (a: A) => (b: B) => Out

export type BinaryOperation<A, B, Out> = BinaryOperationS<A, B, Out> & BinaryOperationD<A, B, Out>

export type TernaryOperationD<A, B, V, Out> = (a: A, b: B) => (value: V) => Out

export type AutoUnaryOperation<T> = UnaryOperation<T, T>

export type AutoBinaryOperation<T> = BinaryOperation<T, T, T>

export type BooleanBinaryOperation<T> = BinaryOperation<T, T, boolean>

/**
 * use purry() to implement functions that support currying
 */
export interface BasicArithmetic<N> {
  zero: N
  one: N
  num: (a: number) => N
  add: AutoBinaryOperation<N>
  sub: AutoBinaryOperation<N>
  mul: AutoBinaryOperation<N>
  div: AutoBinaryOperation<N>
  mod: AutoBinaryOperation<N>
  min: AutoBinaryOperation<N>
  max: AutoBinaryOperation<N>
  abs: AutoUnaryOperation<N>
  sqrt: AutoUnaryOperation<N>
  eq: BooleanBinaryOperation<N>
  lt: BooleanBinaryOperation<N>
  gt: BooleanBinaryOperation<N>
  lte: BooleanBinaryOperation<N>
  gte: BooleanBinaryOperation<N>
}

export interface WithTernaryComparisons<N> {
  gtelte: TernaryOperationD<N, N, N, boolean>
  gtlte: TernaryOperationD<N, N, N, boolean>
  gtelt: TernaryOperationD<N, N, N, boolean>
  gtlt: TernaryOperationD<N, N, N, boolean>
}

export const getTernaryComparisons = <N>(arithmetic: BasicArithmetic<N>) => {
  const { eq, lt, gt, lte, gte } = arithmetic
  return {
    gtelte: (lower: N, upper: N) => and([gte(lower), lte(upper)]),
    gtlte: (lower: N, upper: N) => and([gt(lower), lte(upper)]),
    gtelt: (lower: N, upper: N) => and([gte(lower), lt(upper)]),
    gtlt: (lower: N, upper: N) => and([gt(lower), lt(upper)]),
  }
}

export const getBasicOperations = <N>(arithmetic: BasicArithmetic<N>) => {
  return {
    sum: sum(arithmetic),
    sumAmounts: sumAmounts(arithmetic),
    halve: halve(arithmetic),
    clamp: clamp(arithmetic),
    clampIn: clampIn(arithmetic),
    getShare: getShare(arithmetic),
    getQuotientOf: getQuotientOf(arithmetic),
    getDeltas: getDeltas(arithmetic),
  }
}

export const getBasicValidations = <N>(arithmetic: BasicArithmetic<N>) => {
  return {
    isValidQuotientSum: isValidQuotientSum(arithmetic),
  }
}
