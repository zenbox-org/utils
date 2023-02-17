export type UnaryOperation<A, Out> =(a: A) => Out

export type BinaryOperationS<A, B, Out> = (a: A, b: B) => Out

export type BinaryOperationD<A, B, Out> = (a: A) => (b: B) => Out

export type BinaryOperation<A, B, Out> = BinaryOperationS<A, B, Out> & BinaryOperationD<A, B, Out>

export type AutoUnaryOperation<T> = UnaryOperation<T, T>

export type AutoBinaryOperation<T> = BinaryOperation<T, T, T>

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
  min: AutoBinaryOperation<T>
  max: AutoBinaryOperation<T>
  abs: AutoUnaryOperation<T>
  sqrt: AutoUnaryOperation<T>
  eq: BinaryOperation<T, T, boolean>
  lt: BinaryOperation<T, T, boolean>
  gt: BinaryOperation<T, T, boolean>
  lte: BinaryOperation<T, T, boolean>
  gte: BinaryOperation<T, T, boolean>
}
