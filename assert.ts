/**
 * May throw an exception
 */
export type Asserter<Val> = (value: Val) => Val

export { strict as assert } from 'assert'
