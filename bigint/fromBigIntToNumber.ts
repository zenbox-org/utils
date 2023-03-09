import { BigIntAllAssertions } from './arithmetic'

export const fromBigIntToNumber = (value: bigint) => {
  BigIntAllAssertions.lte(value, BigInt(Number.MAX_SAFE_INTEGER), 'value', 'BigInt(Number.MAX_SAFE_INTEGER)')
  return Number(value)
}
