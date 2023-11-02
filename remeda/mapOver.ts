import { Mapper } from '../Mapper'

/**
 * @see `fill`
 */
export const mapOver = <In>(input: In) => <Out>(mappers: Mapper<In, Out>[]): Out[] => mappers.map(mapper => mapper(input))

export const flatMapOver = <In>(inputs: In[]) => <Out>(mappers: Mapper<In, Out>[]): Out[] => mappers.flatMap(mapper => inputs.map(mapper))
