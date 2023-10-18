import { and } from '../generic/models/Filter'
import { clamp, clampIn } from './arithmetic/clamp'
import { getDeltas } from './arithmetic/getDeltas'
import { getShare } from './arithmetic/getShare'
import { halve } from './arithmetic/halve'
import { sum, sumAmounts, sumMap } from './arithmetic/sum'
import { getQuotientOf } from './Quotient/getQuotientOf'

export type UnaryOperation<A, Out> = (a: A) => Out

export type BinaryOperationS<A, B, Out> = (a: A, b: B) => Out

export type BinaryOperationD<A, B, Out> = (a: A) => (b: B) => Out

export type BinaryOperation<A, B, Out> = BinaryOperationS<A, B, Out> & BinaryOperationD<A, B, Out>

export type TernaryOperationD<A, B, V, Out> = (a: A, b: B) => (value: V) => Out

export type AutoUnaryOperation<T> = UnaryOperation<T, T>

export type AutoBinaryOperation<T> = BinaryOperation<T, T, T>

export type BooleanBinaryOperation<T> = BinaryOperation<T, T, boolean>

export type PartialBooleanBinaryOperation<T> = BinaryOperation<T, T, boolean | undefined>

export interface BasicType<N> {
  zero: N
  one: N
}

export interface ConversionsFrom<N> {
  fromNumber: (v: number) => N
  fromString: (v: string) => N
}

export interface HomoBasicOperations<N> {
  add: AutoBinaryOperation<N>
  sub: AutoBinaryOperation<N>
  mul: AutoBinaryOperation<N>
  div: AutoBinaryOperation<N>
  mod: AutoBinaryOperation<N>
}

export interface HomoBasicComparators<N> {
  eq: BooleanBinaryOperation<N>
  lt: BooleanBinaryOperation<N>
  gt: BooleanBinaryOperation<N>
  lte: BooleanBinaryOperation<N>
  gte: BooleanBinaryOperation<N>
}

export interface PartialOrder<N> {
  eq: PartialBooleanBinaryOperation<N>
  lt: PartialBooleanBinaryOperation<N>
  gt: PartialBooleanBinaryOperation<N>
  lte: PartialBooleanBinaryOperation<N>
  gte: PartialBooleanBinaryOperation<N>
}

export interface HeteroBasicOperations<A, B, Out> {
  add: BinaryOperation<A, B, Out>
  sub: BinaryOperation<A, B, Out>
  mul: BinaryOperation<A, B, Out>
  div: BinaryOperation<A, B, Out>
  mod: BinaryOperation<A, B, Out>
}

export interface HeteroComparators<A, B> {
  eq: BinaryOperation<A, B, boolean>
  lt: BinaryOperation<A, B, boolean>
  gt: BinaryOperation<A, B, boolean>
  lte: BinaryOperation<A, B, boolean>
  gte: BinaryOperation<A, B, boolean>
}

/**
 * use purry() to implement functions that support currying
 */
export interface BasicArithmetic<N> extends BasicType<N>, HomoBasicComparators<N>, ConversionsFrom<N>, HomoBasicOperations<N> {
  min: AutoBinaryOperation<N> // TODO: define in terms of lt
  max: AutoBinaryOperation<N> // TODO: define in terms of gt
  abs: AutoUnaryOperation<N>
  sqrt: AutoUnaryOperation<N>
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

export const getAdvancedOperations = <N>(arithmetic: BasicArithmetic<N>) => {
  return {
    sum: sum(arithmetic),
    sumMap: sumMap(arithmetic),
    sumAmounts: sumAmounts(arithmetic),
    halve: halve(arithmetic),
    clamp: clamp(arithmetic),
    clampIn: clampIn(arithmetic),
    getShare: getShare(arithmetic),
    getQuotientOf: getQuotientOf(arithmetic),
    getDeltas: getDeltas(arithmetic),
  }
}
