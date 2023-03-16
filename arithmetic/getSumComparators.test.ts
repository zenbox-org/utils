import { NumberBasicArithmetic } from '../number/NumberBasicArithmetic'
import { getQuotientBasicArithmetic } from '../Quotient/getQuotientBasicArithmetic'
import { sumLteOne } from './getSumComparators'

test(sumLteOne.name, async () => {
  const sumLteOneLocal = sumLteOne(getQuotientBasicArithmetic(NumberBasicArithmetic))
  expect(sumLteOneLocal([])).toBeTruthy()
  expect(sumLteOneLocal([{ numerator: 1, denominator: 100 }])).toBeTruthy()
  expect(sumLteOneLocal([{ numerator: 100, denominator: 100 }])).toBeTruthy()
  expect(sumLteOneLocal([{ numerator: 1, denominator: 100 }, { numerator: 5, denominator: 100 }])).toBeTruthy()
  expect(sumLteOneLocal([{ numerator: 1, denominator: 100 }, { numerator: 100, denominator: 100 }])).toBeFalsy()
  expect(sumLteOneLocal([{ numerator: 1, denominator: 100 }, { numerator: 1, denominator: 500 }])).toBeTruthy()
})
