import { test } from '@jest/globals'
import { expect } from '../../chai/init'
import { replaceEnd } from './replaceEnd'

test(replaceEnd.name, () => {
  const filename = 'report.txt'
  const filenameReplacedActual = replaceEnd(filename, 'txt', 'csv')
  const filenameReplacedExpected = 'report.csv'
  expect(filenameReplacedActual).to.equal(filenameReplacedExpected)
})
