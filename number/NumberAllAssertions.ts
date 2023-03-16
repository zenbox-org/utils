import { NumberBasicAssertions } from './NumberBasicAssertions'
import { NumberTernaryAssertions } from './NumberTernaryAssertions'

export const NumberAllAssertions = {
  ...NumberBasicAssertions,
  ...NumberTernaryAssertions,
}

export const assert = NumberAllAssertions

export const assertNumber = NumberAllAssertions
