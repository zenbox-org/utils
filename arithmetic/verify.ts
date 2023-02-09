import { assert } from '../assert'
import { Arithmetic } from '../arithmetic'

export const verify = <T>(arithmetic: Arithmetic<T>) => (a: T) => (b: T) => {
  const { zero, one, add, sub, mul, div } = arithmetic
  assert(add(a, zero) == a)
  assert(sub(a, zero) == a)
  assert(mul(a, zero) == zero)
  assert(mul(a, one) == a)
  assert(div(a, one) == a)
  const sum = add(a, b)
  const product = mul(a, b)
  assert(sub(sum, b) == a)
  assert(div(product, b) == a)
}
