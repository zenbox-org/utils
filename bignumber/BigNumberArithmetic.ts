import { Arithmetic } from '../arithmetic'
import { BigNumber } from 'bignumber.js'
import { purry } from 'remeda'

export const BigNumberArithmetic: Arithmetic<BigNumber> = {
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
  div() {
    return purry((a: BigNumber, b: BigNumber) => a.dividedBy(b), arguments)
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
