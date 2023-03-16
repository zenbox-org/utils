import { equals, purry } from 'remeda'

export function nequals<T>(a: T, b: T): boolean

export function nequals<T>(b: T): (a: T) => boolean

export function nequals() {
  return purry(<T>(a: T, b: T) => !equals(a, b), arguments)
}
