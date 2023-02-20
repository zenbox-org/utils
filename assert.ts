import $assert from 'assert'
import { equals, identity } from 'remeda'
import { toString } from './string'

/**
 * May throw an exception
 */
export type Asserter<Val> = (value: Val) => Val

export const assertBy = <A, B = A>(comparator: (a: A, b: B) => boolean, $comparator = comparator.name) => (a: A, b: B, $a = `${a}`, $b = `${b}`, $message = '') => {
  return $assert.strict(
    comparator(a, b),
    [
      `${$comparator}(${$a}, ${$b})`,
      `${$comparator}(${toStringForAssert(a)}, ${toStringForAssert(b)})`,
      $message,
    ].filter(identity).join(' ~ ')
  )
}

export const toStringForAssert = (s: unknown) => toString(s === '' ? '<empty-string>' : s)

export const assertEq = assertBy(equals)
