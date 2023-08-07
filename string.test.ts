import { test } from '@jest/globals'
import { expect } from '../chai/init'
import { nail, toString } from './string'

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
