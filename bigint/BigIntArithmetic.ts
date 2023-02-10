import { Arithmetic } from '../arithmetic'
import { purry } from 'remeda'

export const BigIntArithmetic: Arithmetic<bigint> = {
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
  /* IMPORTANT: This is integer division */
  div() {
    return purry((a: bigint, b: bigint) => a / b, arguments)
  },
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
