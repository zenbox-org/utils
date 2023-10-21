import { MapperP } from 'libs/generic/models/Mapper'
import { ParserP } from '../../decimaker/models/Parser'
import { GetterP } from '../Getter'

export const maxDefault = 10

export const getUntilIsValid = <T>(get: GetterP<T>, isValid: (value: T) => Promise<boolean>) => async (max: number = maxDefault): Promise<T | undefined> => {
  if (max <= 0) return
  const value = await get()
  if (await isValid(value)) return value
  return getUntilIsValid(get, isValid)(max - 1)
}

export const getUntilParse = <In, Out, Err>(get: GetterP<In>, parse: ParserP<In, Out, Err>) => async (max: number): Promise<Out | undefined> => {
  if (max <= 0) return
  const value = await get()
  const result = await parse(value)
  if (result.success) {
    return result.data
  } else {
    return getUntilParse(get, parse)(max - 1)
  }
}

export const getUntilMap = <A, B>(get: GetterP<A>, map: MapperP<A, B>) => async (max: number): Promise<B | undefined> => {
  if (max <= 0) return
  try {
    const value = await get()
    return map(value)
  } catch (e) {
    return getUntilMap(get, map)(max - 1)
  }
}

export const getUntilMapDefined = <A, B>(get: GetterP<A | undefined>, parse: MapperP<A, B>) => getUntilMap(get, mapDefined(parse))

const mapDefined = <A, B>(map: MapperP<A, B>) => (value: A | undefined) => {
  if (value === undefined) {
    throw new Error('Must be defined')
  } else {
    return map(value)
  }
}
