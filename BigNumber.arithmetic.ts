import { BigNumber } from 'bignumber.js'
import { purry } from 'remeda'
import { BaseArithmetic } from './arithmetic'

export const BigNumberArithmetic: BaseArithmetic<BigNumber> = {
  zero: new BigNumber(0),
  one: new BigNumber(1),
  num(a) {
    return new BigNumber(a)
  },
  add() {
    return purry((a: BigNumber, b: BigNumber) => a.plus(b), arguments)
  },
  sub() {
    return purry((a: BigNumber, b: BigNumber) => a.minus(b), arguments)
  },
  mul() {
    return purry((a: BigNumber, b: BigNumber) => a.multipliedBy(b), arguments)
  },
  /* IMPORTANT: This function loses data due to fixed precision */
  div() {
    return purry((a: BigNumber, b: BigNumber) => a.dividedBy(b), arguments)
  },
  mod() {
    return purry((a: BigNumber, b: BigNumber) => a.modulo(b), arguments)
  },
  min() {
    return purry((a: BigNumber, b: BigNumber) => BigNumber.min(a, b), arguments)
  },
  max() {
    return purry((a: BigNumber, b: BigNumber) => BigNumber.max(a, b), arguments)
  },
  abs(a) {
    return a.abs()
  },
  sqrt(a) {
    return a.sqrt()
  },
  eq() {
    return purry((a: BigNumber, b: BigNumber) => a.eq(b), arguments)
  },
  lt() {
    return purry((a: BigNumber, b: BigNumber) => a.lt(b), arguments)
  },
  gt() {
    return purry((a: BigNumber, b: BigNumber) => a.gt(b), arguments)
  },
  lte() {
    return purry((a: BigNumber, b: BigNumber) => a.lte(b), arguments)
  },
  gte() {
    return purry((a: BigNumber, b: BigNumber) => a.gte(b), arguments)
  },
}
