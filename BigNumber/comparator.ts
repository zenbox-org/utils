import { BigNumber } from 'bignumber.js'

export const compareBigNumbers = (a: BigNumber, b: BigNumber) => {
  const result = a.minus(b)
  return (result.isZero() ? 0 : (result.isNegative() ? -1 : 1))
}
