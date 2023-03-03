import { purry } from 'remeda'
import { BaseArithmetic, extendArithmetic } from './arithmetic'
import { getAssert } from './arithmetic/getAssert'

export const BaseNumberArithmetic: BaseArithmetic<number> = {
  zero: 0,
  one: 1,
  num(a) {
    return a
  },
  add() {
    return purry((a: number, b: number) => a + b, arguments)
  },
  sub() {
    return purry((a: number, b: number) => a - b, arguments)
  },
  mul() {
    return purry((a: number, b: number) => a * b, arguments)
  },
  div() {
    return purry((a: number, b: number) => a / b, arguments)
  },
  mod() {
    return purry((a: number, b: number) => a % b, arguments)
  },
  min() {
    return purry((a: number, b: number) => a < b ? a : b, arguments)
  },
  max() {
    return purry((a: number, b: number) => a > b ? a : b, arguments)
  },
  abs(a: number) {
    return a < 0 ? -a : a
  },
  sqrt(a: number) {
    return Math.sqrt(a)
  },
  eq() {
    return purry((a: number, b: number) => a === b, arguments)
  },
  lt() {
    return purry((a: number, b: number) => a < b, arguments)
  },
  gt() {
    return purry((a: number, b: number) => a > b, arguments)
  },
  lte() {
    return purry((a: number, b: number) => a <= b, arguments)
  },
  gte() {
    return purry((a: number, b: number) => a >= b, arguments)
  },
}

export const NumberArithmetic = extendArithmetic(BaseNumberArithmetic)

export const assert = getAssert(NumberArithmetic)
