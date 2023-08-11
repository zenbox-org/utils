import { test } from '@jest/globals'
import { expect } from 'chai'

test('It must trim the array from left and right', () => {

})

type TrimType = <T>(filter: (value: T) => boolean, array: T[]) => T[]

function trimSpec(trim: TrimType) {
  const eq10 = (value: number) => value === 10
  const eqa = (value: string) => value === 'a'
  expect(trim(eq10, [1, 2, 3])).to.equal([1, 2, 3])
  expect(trim(eq10, [10, 2, 3])).to.equal([2, 3])
  expect(trim(eq10, [10, 10, 10, 2, 3])).to.equal([2, 3])
  expect(trim(eq10, [10, 10, 10, 2, 3, 10, 10])).to.equal([2, 3])
  expect(trim(eqa, ['a', 'b', 'c'])).to.equal(['b', 'c'])
  expect(trim(eqa, ['a', 'b', 'a', 'c'])).to.equal(['b', 'a', 'c'])
  expect(trim(eqa, ['a', 'b', 'a', 'c', 'a', 'a'])).to.equal(['b', 'a', 'c'])
}
