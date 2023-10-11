import { MapperP } from 'libs/generic/models/Mapper'

export const getUntilIsValid = <T>(max: number, isValid: (value: T) => Promise<boolean>) => async (get: () => Promise<T | undefined>): Promise<T | undefined> => {
  if (max <= 0) return
  const value = await get()
  if (value === undefined) return
  if (await isValid(value)) return value
  return getUntilIsValid(max - 1, isValid)(get)
}

export const getUntilParse = <A, B>(max: number, parse: MapperP<A, B>) => async (get: () => Promise<A | undefined>): Promise<B | undefined> => {
  if (max <= 0) return
  try {
    const value = await get()
    if (value === undefined) return
    return parse(value)
  } catch (e) {
    return getUntilParse(max - 1, parse)(get)
  }
}
