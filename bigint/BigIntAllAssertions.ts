import { BigIntBasicAssertions } from './BigIntBasicAssertions'
import { BigIntTernaryAssertions } from './BigIntTernaryAssertions'

export const BigIntAllAssertions = {
  ...BigIntBasicAssertions,
  ...BigIntTernaryAssertions,
}

export const assert = BigIntAllAssertions

export const assertBigInt = BigIntAllAssertions
