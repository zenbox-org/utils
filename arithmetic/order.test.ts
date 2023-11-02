import { expect, test } from '@jest/globals'
import { array, double } from 'fast-check'
import { equals, sort } from 'remeda'
import { ascending, descending } from '../comparator'
import { assertPRD } from '../fast-check/assert'
import { NumberBasicArithmetic } from '../number/NumberBasicArithmetic'
import { compareNumerals } from '../numeral/sort'
import { allUnique } from '../remeda/allUnique'
import { isAscending, isAscendingStrict, isDescending, isDescendingStrict } from './order'

test('order', async function () {
  const isAscendingN = isAscending(NumberBasicArithmetic)
  const isDescendingN = isDescending(NumberBasicArithmetic)
  const isAscendingStrictN = isAscendingStrict(NumberBasicArithmetic)
  const isDescendingStrictN = isDescendingStrict(NumberBasicArithmetic)
  return assertPRD(array(double()), async function (arr) {
    if (arr.length <= 1) {
      expect(isAscendingN(arr)).toBeTruthy()
      expect(isDescendingN(arr)).toBeTruthy()
      expect(isAscendingStrictN(arr)).toBeTruthy()
      expect(isDescendingStrictN(arr)).toBeTruthy()
    } else {
      const arrSortedAsc = sort(ascending(compareNumerals))(arr)
      const arrSortedDsc = sort(descending(compareNumerals))(arr)
      const arrsAreEqual = equals(arrSortedAsc, arrSortedDsc)
      const arrIsUnique = allUnique(arr)
      if (arrsAreEqual) {
        expect(isAscendingN(arrSortedAsc)).toBeTruthy()
        expect(isDescendingN(arrSortedAsc)).toBeTruthy()
        expect(isAscendingN(arrSortedDsc)).toBeTruthy()
        expect(isDescendingN(arrSortedDsc)).toBeTruthy()
      } else {
        expect(isAscendingN(arrSortedAsc)).toBeTruthy()
        expect(isDescendingN(arrSortedAsc)).toBeFalsy()
        expect(isAscendingN(arrSortedDsc)).toBeFalsy()
        expect(isDescendingN(arrSortedDsc)).toBeTruthy()
      }
      if (arrIsUnique) {
        expect(isAscendingStrictN(arrSortedAsc)).toEqual(isAscendingN(arrSortedAsc))
        expect(isAscendingStrictN(arrSortedDsc)).toEqual(isAscendingN(arrSortedDsc))
        expect(isDescendingStrictN(arrSortedAsc)).toEqual(isDescendingN(arrSortedAsc))
        expect(isDescendingStrictN(arrSortedDsc)).toEqual(isDescendingN(arrSortedDsc))
      } else {
        expect(isAscendingStrictN(arrSortedAsc)).toBeFalsy()
        expect(isAscendingStrictN(arrSortedDsc)).toBeFalsy()
        expect(isDescendingStrictN(arrSortedAsc)).toBeFalsy()
        expect(isDescendingStrictN(arrSortedDsc)).toBeFalsy()
      }
    }
  })
})
