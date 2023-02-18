import $assert from 'assert'
import { equals } from 'remeda'

/**
 * May throw an exception
 */
export type Asserter<Val> = (value: Val) => Val

export const assertBy = <A, B = A>(comparator: (a: A, b: B) => boolean, $comparator = comparator.name) => (a: A, b: B, $a = `${a}`, $b = `${b}`, $message = '') => {
  return $assert.strict(comparator(a, b), `${$comparator}(${$a}, ${$b}) ~ ${$comparator}(${a}, ${b}) ${$message}`.trim())
}

export const assertEq = assertBy(equals)
