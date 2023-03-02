import $assert from 'assert'
import * as process from 'process'
import { equals, identity } from 'remeda'
import { fetchBooleanEnvVar } from './process'
import { toString } from './string'

/**
 * May throw an exception
 */
export type Asserter<Val> = (value: Val) => Val

const withContext = fetchBooleanEnvVar('ASSERT_WITH_CONTEXT', process.env.ASSERT_WITH_CONTEXT)

export const assertByUnary = <A>(filter: (a: A) => boolean, $filter = filter.name) => (a: A, $a = `${a}`, context?: Record<string, unknown>, $message?: string) => {
  return $assert.strict(
    filter(a),
    getMessage($filter, [a], [$a], $message, context)
  )
}

export const assertByBinary = <A, B = A>(filter: (a: A, b: B) => boolean, $filter = filter.name) => (a: A, b: B, $a = `${a}`, $b = `${b}`, context?: Record<string, unknown>, $message?: string) => {
  return $assert.strict(
    filter(a, b),
    getMessage($filter, [a, b], [$a, $b], $message, context)
  )
}

export function getMessage($func: string, args: unknown[], $args: string[], $message?: string, context?: Record<string, unknown>) {
  return [
    [
      `${$func}(${$args.join(', ')})`,
      `${$func}(${args.map(toStringForAssert).join(', ')})`,
      $message,
    ].filter(identity).join(' ~ '),
    withContext ? toString(context) : '',
  ].filter(identity).join('\n')
}

export const toStringForAssert = (s: unknown) => toString(s === '' ? '<empty-string>' : s)

export const assertEq = assertByBinary(equals)
