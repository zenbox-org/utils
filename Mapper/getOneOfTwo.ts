import { MapperP } from './index'

export const getOneOfTwo = <In, Out>(mapU: MapperP<In, Out | undefined>, map: MapperP<In, Out>) => async (input: In) => {
  return (await mapU(input)) ?? (await map(input))
}
