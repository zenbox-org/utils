import { Mapper } from '../Mapper'

/**
 * @see `mapOver`
 */
export const fill = <In, Out>(fns: Mapper<In, Out>[]) => (input: In) => fns.map(fn => fn(input))
