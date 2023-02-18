import { difference, equals } from 'remeda'
import { Mapper } from '../generic/models/Mapper'
import { GetUid } from './zod'

export type IsEqual<U> = (a: U) => (b: U) => boolean

export const isEqualBy = <U, V>(mapper: Mapper<U, V>) => (a: U, b: U) => isEqualByD(a, b, mapper)

/**
 * DC = Deep Curried
 */
export const isEqualDC = <U>(a: U) => (b: U) => equals(a, b)

/**
 * SC = Shallow Curried
 */
export const isEqualSC = <U>(a: U) => (b: U) => a === b

/**
 * D = Deep
 */
export const isEqualByD = <U, V>(a: U, b: U, mapper: Mapper<U, V>) => equals(mapper(a), mapper(b))

/**
 * DC = Deep Curried
 */
export const isEqualByDC = <U, V>(mapper: Mapper<U, V>) => (a: U) => (b: U) => isEqualByD(a, b, mapper)

export function isSubsetOf<T>(set: T[], subset: T[]) {
  return difference(set, subset).length === 0
}

// export function mergeWithArrays<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2 {
//   return mergeWith(object, source1, source2, function (a, b) {
//     if (isArray(a) && isArray(b)) {
//       return b.concat(a)
//     }
//   })
// }

export const notInBy = <Elem, Uid>(getUid: GetUid<Elem>) => (elements: Elem[]) => (element: Elem) => {
  return !elements.find(el => isEqualByD(el, element, getUid))
}

/**
 * Doesn't allow undefined values
 */
export const identityStrict = <T>(value: T) => value
