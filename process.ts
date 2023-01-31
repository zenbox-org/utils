import { string2boolean } from './conversion'

/**
 * Next.js inlines `process.env.VAR_NAME` during build, so they must be passed directly
 * @param name
 * @param value
 */
export function ensureEnvVar(name: string, value: string | undefined, $default?: string) {
  const $value = value || $default
  if ($value) return $value
  throw new Error(`process.env.${name} is required. If you're running Next.js code on the client, prefix the var with "NEXT_PUBLIC_" to make it available on the frontend.`)
}

export function getArrayEnvVar(name: string, value: string | undefined, $default?: string): string[] {
  const valuesAsString = ensureEnvVar(name, value, $default)
  return valuesAsString.split(',')
}

export function getNonEmptyArrayEnvVar(name: string, value: string | undefined, $default?: string): [string, ...string[]] {
  const values = getArrayEnvVar(name, value, $default)
  if (!values.length) throw new Error(`process.env.${name} must be a comma-separated list with at least one element`)
  const first = values[0]
  const rest = values.slice(1)
  return [first, ...rest]
}

export function getBooleanEnvVar(name: string, value: string | undefined) {
  return string2boolean(value || '')
}
