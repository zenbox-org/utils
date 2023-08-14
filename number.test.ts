import { test } from '@jest/globals'
import { expect } from '../chai/init'
import { getDistances } from './number'

test(getDistances.name, () => {
  expect(getDistances([])).to.deep.equal([])
  expect(getDistances([0])).to.deep.equal([])
  expect(getDistances([0, 1])).to.deep.equal([1])
  expect(getDistances([0, 1, 10, 5])).to.deep.equal([1, 9, -5])
})
