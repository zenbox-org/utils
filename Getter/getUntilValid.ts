import { MapperP, PredicateP } from 'libs/generic/models/Mapper'
import { GetterP } from '../Getter'
import { ParserP } from '../Parser'

export const maxDefault = 10

export const getUntilIsValidP = <T>(get: GetterP<T>, isValid: PredicateP<T>) => async (max: number = maxDefault): Promise<T | undefined> => {
  if (max <= 0) return
  const value = await get()
  if (await isValid(value)) return value
  return getUntilIsValidP(get, isValid)(max - 1)
}

export const getUntilParseP = <In, Out, Err>(get: GetterP<In>, parse: ParserP<In, Out, Err>) => async (max: number = maxDefault): Promise<Out | undefined> => {
  if (max <= 0) return
  const value = await get()
  const result = await parse(value)
  if (result.success) {
    return result.data
  } else {
    return getUntilParseP(get, parse)(max - 1)
  }
}

export const getUntilMap = <A, B>(get: GetterP<A>, map: MapperP<A, B>) => async (max: number = maxDefault): Promise<B | undefined> => {
  if (max <= 0) return
  try {
    const value = await get()
    return map(value)
  } catch (e) {
    return getUntilMap(get, map)(max - 1)
  }
}
