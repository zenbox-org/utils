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

export const assertBy = <A, B = A>(comparator: (a: A, b: B) => boolean, $comparator = comparator.name) => (a: A, b: B, $a = `${a}`, $b = `${b}`, context?: Record<string, unknown>, $message?: string) => {
  return $assert.strict(
    comparator(a, b),
    [
      [
        `${$comparator}(${$a}, ${$b})`,
        `${$comparator}(${toStringForAssert(a)}, ${toStringForAssert(b)})`,
        $message,
      ].filter(identity).join(' ~ '),
      withContext ? toString(context) : '',
    ].filter(identity).join('\n')
  )
}

export const toStringForAssert = (s: unknown) => toString(s === '' ? '<empty-string>' : s)

export const assertEq = assertBy(equals)
