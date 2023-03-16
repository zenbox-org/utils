import { purry } from 'remeda'

export function includes<T>(value: T): (array: T[]) => boolean

export function includes<T>(array: T[], value: T): boolean

export function includes() {
  return purry(<T>(array: T[], value: T) => array.includes(value), arguments)
}
