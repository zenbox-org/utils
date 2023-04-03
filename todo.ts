import { nail } from './string'

// allows implementing partial functions & leaving a message for another developer
export function todo<V>(value?: V, message = 'TODO'): V {
  if (value === undefined) throw impl(message)
  return value
}

/**
 * Used for marking incomplete data
 */
export function incomplete<V>(value: V) {
  return value
}

/**
 * @deprecated use todo()
 */
export function stub<V>(message = 'Implement stub'): V {
  throw impl(message)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function impl(message = '') {
  return new ImplementationError(nail(message).trim())
}

export const Impl = function () {
  throw impl()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function manual<Key extends keyof any, Value>(map: Record<Key, Value>, key: Key, message?: string): Value {
  const value = map[key]
  if (!value) throw impl(message)
  return value
}

export class ImplementationError extends Error {

}

export interface Todo {}

export interface Stub {}

export const manually = impl
