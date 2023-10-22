import { identity } from 'remeda'
import { NonEmptyArray } from './array/ensureNonEmptyArray'
import { string2array, string2boolean, string2integer } from './conversion'
import { Mapper } from './Mapper'

/**
 * Next.js inlines `process.env.VAR_NAME` during build, so they must be passed directly
 */
export const getEnvVar = <T>(mapper: Mapper<string, T>) => ($name: string, $value: string | undefined, $default?: T): T => {
  if ($value) return mapper($value)
  if ($default !== undefined) return $default
  throw new Error(`process.env.${$name} is required. If you're running Next.js code on the client, prefix the var with "NEXT_PUBLIC_" to make it available on the frontend.`)
}

export const getStringEnvVar = getEnvVar(identity)

export const fetchStringEnvVar = ($name: string, $value: string | undefined) => getStringEnvVar($name, $value, '')

export const getBooleanEnvVar = getEnvVar(string2boolean)

export const fetchBooleanEnvVar = ($name: string, $value: string | undefined) => getBooleanEnvVar($name, $value, false)

export const getIntegerEnvVar = getEnvVar(string2integer)

export const fetchIntegerEnvVar = ($name: string, $value: string | undefined) => getIntegerEnvVar($name, $value, 0)

export const getArrayEnvVar = getEnvVar(string2array)

export const getNonEmptyArrayStringEnvVar = (name: string, value: string | undefined, $default?: string[]): NonEmptyArray<string> => {
  const values = getArrayEnvVar(name, value, $default)
  const first = values[0]
  const rest = values.slice(1)
  if (!first) throw new Error(`process.env.${name} must be a comma-separated list with at least one element`)
  return [first, ...rest]
}
