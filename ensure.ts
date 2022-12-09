import { identity } from 'rambdax'
import { Cage, Caged, CageP, uncage, uncageP } from './cage'

export function ensure<Obj, Err extends Caged>(object: Obj | null | undefined, error?: Cage<Err>) {
  if (object === null || object === undefined) throw uncage(error ?? getNotFoundError())
  return object
}

export async function ensureP<Obj, Err extends Caged>(object: Obj | null | undefined, error?: CageP<Err>) {
  if (object === null || object === undefined) throw await uncageP(error ?? getNotFoundError())
  return object
}

export function ensureFind<Obj, Err extends Caged>(collection: Obj[], filter: (object: Obj) => boolean, error?: Cage<Err>) {
  const object = collection.find(filter)
  if (object === null || object === undefined) throw uncage(error ?? getNotFoundErrorForFilter(filter))
  return object
}

export async function ensureFindP<Obj, Err extends Caged>(collection: Obj[], filter: (object: Obj) => boolean, error?: CageP<Err>) {
  const object = collection.find(filter)
  if (object === null || object === undefined) throw await uncageP(error ?? getNotFoundErrorForFilter(filter))
  return object
}

export function ensureMapGet<Key, Value, Err extends Caged>(map: Map<Key, Value>, key: Key, error?: Cage<Err>) {
  return ensure(map.get(key), () => uncage(error) ?? getNotFoundInMapByKeyError(map, key))
}

export function ensureGet<Key extends string | number | symbol, Value, Err extends Caged>(record: Record<Key, Value>, key: Key, error?: Cage<Err>) {
  return ensure(record[key], () => uncage(error) ?? getNotFoundInRecordByKeyError(record, key))
}

export function ensureIndex<Value, Err extends Caged>(array: Value[], index: number, error?: Cage<Err>) {
  return ensure(array[index], () => uncage(error) ?? getNotFoundInArrayByIndexError(array, index))
}

export function ensureEvery<Obj, Err extends Caged>(objects: Array<Obj | null | undefined>, error?: CageP<Err>) {
  if (!objects.every(identity)) throw uncage(error ?? new Error(`Some objects are falsy: \n\n${JSON.stringify(objects)}`))
  return objects
}

export function ensureError(e: unknown) {
  if (e instanceof Error) {
    return e
  } else {
    throw e
  }
}

export const getNotFoundError = () => new Error('Can\'t find object in collection')

export const getNotFoundErrorForFilter = <Obj>(filter: (object: Obj) => boolean) => new Error('Can\'t find an object in a collection using filter: ' + filter.toString())

export const getNotFoundInMapByKeyError = <Key, Value>(map: Map<Key, Value>, key: Key) => new Error(`Can't find key "${key}" in map ${map}`)

export const getNotFoundInRecordByKeyError = <Key extends string | number | symbol, Value>(record: Record<Key, Value>, key: Key) => new Error(`Can't find key "${key.toString()}" in record ${record}`)

export const getNotFoundInArrayByIndexError = <Value>(array: Value[], index: number) => new Error(`Can't find index "${index}" in array ${array.join(', ')}`)
