import { assertEq } from '../assert'
import { WithToString } from '../string'

export const ensureEqString = <T extends WithToString>(convert: ($value: string) => T) => ($value: string) => {
  const value = convert($value)
  assertEq(value.toString(), $value, 'value.toString()', '$value')
  return value
}
