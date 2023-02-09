export type BinaryOperationS<A, B, C> = (a: A, b: B) => C

export type BinaryOperationD<A, B, C> = (a: A) => (b: B) => C

export type BinaryOperation<A, B, C> = BinaryOperationS<A, B, C> & BinaryOperationD<A, B, C>

export type AutoBinaryOperation<T> = BinaryOperation<T, T, T>

export type BooleanBinaryOperation<T> = BinaryOperation<T, T, boolean>

/**
 * use purry() to implement functions that support currying
 */
export interface Arithmetic<T> {
  zero: T
  one: T
  num: (a: number) => T
  add: AutoBinaryOperation<T>
  sub: AutoBinaryOperation<T>
  mul: AutoBinaryOperation<T>
  div: AutoBinaryOperation<T>
  eq: BooleanBinaryOperation<T>
  lt: BooleanBinaryOperation<T>
  gt: BooleanBinaryOperation<T>
  lte: BooleanBinaryOperation<T>
  gte: BooleanBinaryOperation<T>
}
