import { Arithmetic } from '../arithmetic'
import { assertByBinary } from '../assert'

/**
 * lower inclusive
 * upper exclusive
 */
export const clamp = <N>({ one, add, sub, mod, lt, gte, zero }: Arithmetic<N>) => (lower: N, upper: N) => (value: N) => {
  assertByBinary(gte)(lower, zero, 'lower', 'zero')
  assertByBinary(gte)(upper, zero, 'upper', 'zero')
  assertByBinary(gte)(value, zero, 'value', 'zero')
  assertByBinary(lt)(lower, upper, 'lower', 'upper')
  return add(lower)(mod(value, sub(upper, lower)))
}

/**
 * lower inclusive
 * upper inclusive
 */

export const clampIn = <N>(arithmetic: Arithmetic<N>) => (lower: N, upper: N) => clamp(arithmetic)(lower, arithmetic.add(upper, arithmetic.one))
