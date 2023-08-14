import { test } from '@jest/globals'
import { expect } from '../chai/init'
import { nail, replaceAt, replaceAtMulti, splitAt, toString } from './string'

test('nail', async function () {
  expect(nail(`
  * One
  * Two
  * Three
  `)).to.equal(`
* One
* Two
* Three
`)
  expect(nail(`
  * One
  * Two
    * Two nested 1
    * Two nested 2
  * Three
  `)).to.equal(`
* One
* Two
  * Two nested 1
  * Two nested 2
* Three
`)
  // double nail
  expect(nail(nail(`
  * One
  * Two
    * Two nested 1
    * Two nested 2
  * Three
  `))).to.equal(nail(`
  * One
  * Two
    * Two nested 1
    * Two nested 2
  * Three
  `))
  expect(nail('No change')).to.equal('No change')
  expect(nail(`
* No change
`)).to.equal(`
* No change
`)
})

test(toString.name, async function () {
  expect(toString({ a: 1 }).trim()).to.equal(`
{
  "a": 1
}
  `.trim())
})

test(replaceAt.name, async function () {
  expect(replaceAt('some text here', 'another', 0, 4)).to.equal('another text here')
  expect(replaceAt('some text here', 'message', 5, 9)).to.equal('some message here')
})

test(splitAt.name, async function () {
  expect(splitAt('some text here', [0, 4])).to.deep.equal(['', 'some', ' text here'])
})

describe(replaceAtMulti.name, function () {
  test('must throw an error if min distance between cuts is lte length', async function () {
    expect(() => replaceAtMulti('', '', [0, 5], 10)).to.throw
  })

  test('must work', async function () {
    expect(replaceAtMulti('some text here', 'replacement', [0, 5], 4)).to.equal('replacement replacement here')
  })
})
