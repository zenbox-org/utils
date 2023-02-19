import { Arithmetic } from '../arithmetic'

/**
 * This function should be passed to array.sort()
 */
export const compare = <N>({ gt, lt }: Arithmetic<N>) => (a: N, b: N) => (lt(a, b)) ? -1 : ((gt(a, b)) ? 1 : 0)
