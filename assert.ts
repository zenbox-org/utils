import { strict } from 'assert'

export const assert = strict

/**
 * May throw an exception
 */
export type Asserter<Val> = (value: Val) => Val

export const assertEqual = <T>(a: T, b: T, $a: string, $b: string) => assert(a === b, $a + ' === ' + $b)

export const assertBy = <A, B = A>(comparator: (a: A, b: B) => boolean, $comparator = comparator.name) => (a: A, b: B, $a: string, $b: string, $message = '') => assert(comparator(a, b), `${$comparator}(${$a}, ${$b}) ~ ${$comparator}(${a}, ${b}) ${$message}`.trim())
