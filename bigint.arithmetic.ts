import { purry } from 'remeda'
import { BaseArithmetic, extendArithmetic } from './arithmetic'
import { getAssert } from './arithmetic/getAssert'
import { sqrt } from './bigint/sqrt'

export const BaseBigIntArithmetic: BaseArithmetic<bigint> = {
  zero: BigInt(0),
  one: BigInt(1),
  num(a) {
    return BigInt(a)
  },
  add() {
    return purry((a: bigint, b: bigint) => a + b, arguments)
  },
  sub() {
    return purry((a: bigint, b: bigint) => a - b, arguments)
  },
  mul() {
    return purry((a: bigint, b: bigint) => a * b, arguments)
  },
  /* IMPORTANT: This is integer division. The actual result will be always less than or equal to the expected result: mul(div(a, b), b) <= a */
  div() {
    return purry((a: bigint, b: bigint) => a / b, arguments)
  },
  mod() {
    return purry((a: bigint, b: bigint) => a % b, arguments)
  },
  min() {
    return purry((a: bigint, b: bigint) => a < b ? a : b, arguments)
  },
  max() {
    return purry((a: bigint, b: bigint) => a > b ? a : b, arguments)
  },
  abs(a: bigint) {
    return a < 0n ? -a : a
  },
  sqrt,
  eq() {
    return purry((a: bigint, b: bigint) => a === b, arguments)
  },
  lt() {
    return purry((a: bigint, b: bigint) => a < b, arguments)
  },
  gt() {
    return purry((a: bigint, b: bigint) => a > b, arguments)
  },
  lte() {
    return purry((a: bigint, b: bigint) => a <= b, arguments)
  },
  gte() {
    return purry((a: bigint, b: bigint) => a >= b, arguments)
  },
}

export const BigIntArithmetic = extendArithmetic(BaseBigIntArithmetic)

export const assert = getAssert(BigIntArithmetic)
