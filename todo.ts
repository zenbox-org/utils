import { nail } from './string'

// allows implementing partial functions & leaving a message for another developer
export function todo<V>(value?: V, message = 'TODO'): V {
  if (value === undefined) throw impl(message)
  return value
}

export function stub<V>(message = 'Implement stub'): V {
  throw impl(message)
}

export const hole = stub

/**
 * Used for marking incomplete data (which must be expanded instead of replaced, so can't be marked with todo())
 */
export const incomplete = <V>(value: V) => value

// eslint-disable-next-line @typescript-eslint/ban-types
export const impl = (message = '') => new ImplementationError(nail(message).trim())

export const Impl = () => {
  throw impl()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const manual = <Key extends keyof any, Value>(map: Record<Key, Value>, key: Key, message?: string): Value => {
  const value = map[key]
  if (!value) throw impl(message)
  return value
}

export class ImplementationError extends Error {

}

export type Todo = unknown

export interface Stub {}

export type Likely<T> = T

export const manually = impl
