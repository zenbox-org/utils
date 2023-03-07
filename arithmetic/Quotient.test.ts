import { NumberBasicArithmetic } from '../number.arithmetic'
import { isValidQuotientSum } from './Quotient'

test(isValidQuotientSum.name, async () => {
  const isValidQuotientSumN = isValidQuotientSum(NumberBasicArithmetic)
  expect(isValidQuotientSumN([])).toBeTruthy()
  expect(isValidQuotientSumN([{ numerator: 1, denominator: 100 }])).toBeTruthy()
  expect(isValidQuotientSumN([{ numerator: 100, denominator: 100 }])).toBeTruthy()
  expect(isValidQuotientSumN([{ numerator: 1, denominator: 100 }, { numerator: 5, denominator: 100 }])).toBeTruthy()
  expect(isValidQuotientSumN([{ numerator: 1, denominator: 100 }, { numerator: 100, denominator: 100 }])).toBeFalsy()
  expect(isValidQuotientSumN([{ numerator: 1, denominator: 100 }, { numerator: 1, denominator: 500 }])).toBeFalsy()
})
