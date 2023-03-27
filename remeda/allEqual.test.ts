import { expect, test } from '@jest/globals'
import { allEqual } from './allEqual'

test(allEqual.name, () => {
  expect(allEqual([])).toBeTruthy()
  expect(allEqual([1, 1, 1])).toBeTruthy()
  expect(allEqual([1, 2, 1])).toBeFalsy()
})
