import { Arithmetic } from '../arithmetic'
import { assertByBinary } from '../assert'

export const verify = <T>(arithmetic: Arithmetic<T>) => (a: T) => (b: T) => {
  const { zero, one, add, sub, mul, div, eq, lte } = arithmetic
  const assertEq = assertByBinary(eq)
  const assertLte = assertByBinary(lte)
  const sum = add(a, b)
  const product = mul(a, b)
  const dividend = div(a, b)
  assertEq(add(a, zero), a, 'add(a, zero)', 'a')
  assertEq(sub(a, zero), a, 'sub(a, zero)', 'a')
  assertEq(mul(a, zero), zero, 'mul(a, zero)', 'zero')
  assertEq(mul(a, one), a, 'mul(a, one)', 'a')
  assertEq(div(a, one), a, 'div(a, one)', 'a')
  assertEq(sub(sum, b), a, 'sub(sum, b)', 'a')
  assertEq(div(product, b), a, 'div(product, b)', 'a')
  assertLte(mul(dividend, b), a, 'mul(dividend, b)', 'a', {}, 'Due to integer division, the output may be less than input')
}
