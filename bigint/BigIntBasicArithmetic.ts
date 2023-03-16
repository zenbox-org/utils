import { purry } from 'remeda'
import { BasicArithmetic } from '../arithmetic'
import { sqrtNewton } from './sqrtNewton'

export const BigIntBasicArithmetic: BasicArithmetic<bigint> = {
  zero: BigInt(0),
  one: BigInt(1),
  fromNumber(a) {
    return BigInt(a)
  },
  fromString(a) {
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
  sqrt: sqrtNewton,
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

export const { zero, one, fromNumber, fromString, add, sub, mul, div, mod, min, max, abs, sqrt, eq, lt, gt, lte, gte } = BigIntBasicArithmetic
