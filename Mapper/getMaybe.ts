import { MapperP } from './index'

const getMaybe = <In, Out>(mappers: MapperP<In, Out | undefined>[]) => async (input: In) => {
  return mappers.reduce<Promise<Out | undefined>>(async (result, mapper) => {
    return (await result) ?? (await mapper(input))
  }, Promise.resolve(undefined))
}
