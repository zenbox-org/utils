import { BasicArithmetic } from '../arithmetic'
import { assertTwo } from '../assert'

/**
 * lower inclusive
 * upper exclusive
 */
export const clamp = <N>({ one, add, sub, mod, lt, gte, zero }: BasicArithmetic<N>) => (lower: N, upper: N) => (value: N) => {
  assertTwo(gte)(lower, zero, 'lower', 'zero')
  assertTwo(gte)(upper, zero, 'upper', 'zero')
  assertTwo(gte)(value, zero, 'value', 'zero')
  assertTwo(lt)(lower, upper, 'lower', 'upper')
  return add(lower)(mod(value, sub(upper, lower)))
}

/**
 * lower inclusive
 * upper inclusive
 */
export const clampIn = <N>(arithmetic: BasicArithmetic<N>) => (lower: N, upper: N) => clamp(arithmetic)(lower, arithmetic.add(upper, arithmetic.one))
