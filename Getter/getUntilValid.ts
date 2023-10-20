import { MapperP } from 'libs/generic/models/Mapper'

export const getUntilIsValid = <T>(max: number, isValid: (value: T) => Promise<boolean>) => async (get: () => Promise<T>): Promise<T | undefined> => {
  if (max <= 0) return
  const value = await get()
  if (await isValid(value)) return value
  return getUntilIsValid(max - 1, isValid)(get)
}

export const getUntilParse = <A, B>(max: number, parse: MapperP<A, B>) => async (get: () => Promise<A>): Promise<B | undefined> => {
  if (max <= 0) return
  try {
    const value = await get()
    return parse(value)
  } catch (e) {
    return getUntilParse(max - 1, parse)(get)
  }
}

export const getUntilParseDefined = <A, B>(max: number, parse: MapperP<A, B>) => getUntilParse(max, parseDefined(parse))

const parseDefined = <A, B>(parse: MapperP<A, B>) => (value: A | undefined) => {
  if (value === undefined) {
    throw new Error('Must be defined')
  } else {
    return parse(value)
  }
}
