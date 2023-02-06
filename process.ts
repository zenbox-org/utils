import { string2array, string2boolean } from './conversion'
import { Mapper } from '../generic/models/Mapper'
import { identity } from 'remeda'
import { NonEmptyArray } from './array/types'

/**
 * Next.js inlines `process.env.VAR_NAME` during build, so they must be passed directly
 */
export const getEnvVar = <T>(mapper: Mapper<string, T>) => ($name: string, $value: string | undefined, $default?: T): T => {
  if ($value) return mapper($value)
  if ($default) return $default
  throw new Error(`process.env.${$name} is required. If you're running Next.js code on the client, prefix the var with "NEXT_PUBLIC_" to make it available on the frontend.`)
}

export const getStringEnvVar = getEnvVar(identity)

export const getBooleanEnvVar = getEnvVar(string2boolean)

export const getArrayEnvVar = getEnvVar(string2array)

export const getNonEmptyArrayEnvVar = (name: string, value: string | undefined, $default?: string[]): NonEmptyArray<string> => {
  const values = getArrayEnvVar(name, value, $default)
  if (!values.length) throw new Error(`process.env.${name} must be a comma-separated list with at least one element`)
  const first = values[0]
  const rest = values.slice(1)
  return [first, ...rest]
}
