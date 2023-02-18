import { Arithmetic } from '../arithmetic'

/**
 * lower inclusive
 * upper exclusive
 */
export const clamp = <N>({ one, add, sub, mod }: Arithmetic<N>) => (lower: N, upper: N) => (value: N) => add(lower)(mod(value, sub(upper, lower)))
