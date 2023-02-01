import { BN, BNLike } from '../bn'
import { BigNumber } from './bignumber'

export type BNRenderer = (amount: BNLike) => string

const ten = new BigNumber(10)

export const toFrontendAmountBigNumS = (scale: BigNumber.Value) => (amount: BigNumber.Value) => new BigNumber(amount).dividedBy(scale)

export const toFrontendAmountBigNumD = (decimals: BigNumber.Value) => toFrontendAmountBigNumS(ten.pow(decimals))

export const toRoundedAmountBigNumD = (decimals: BigNumber.Value, roundingPlaces: number, roundingMode?: BigNumber.RoundingMode) => (amount: BigNumber.Value) => toFrontendAmountBigNumD(decimals)(amount).toFixed(roundingPlaces, roundingMode)

export const toBackendAmountBigNumD = (decimals: BigNumber.Value) => (amount: BigNumber.Value) => new BigNumber(amount).multipliedBy(ten.pow(decimals))

export const toFrontendAmountBND = (decimals: BNLike) => (amount: BNLike) => toFrontendAmountBigNumD(decimals.toString())(amount.toString())

export const toFrontendAmountBNS = (scale: BNLike) => (amount: BNLike) => toFrontendAmountBigNumS(scale.toString())(amount.toString())

export const toRoundedAmountBND = (decimals: BNLike, roundingPlaces: number, roundingMode?: BigNumber.RoundingMode) => (amount: BNLike) => toFrontendAmountBigNumD(decimals.toString())(amount.toString()).toFixed(roundingPlaces, roundingMode)

export const toBackendAmountBND = (decimals: BNLike) => (amount: BigNumber.Value) => BN.from(toBackendAmountBigNumD(decimals.toString())(amount).toFixed())

export const toRenderedAmountBND = (decimals: BNLike) => (amount: BNLike) => toFrontendAmountBND(decimals)(amount).toFixed()

export const toRenderedAmountBNS = (scale: BNLike) => (amount: BNLike) => toFrontendAmountBNS(scale)(amount).toFixed()

export const withSign = (renderer: BNRenderer) => (amount: BNLike) => (BN.from(amount).isNegative() ? '' : '+') + renderer(amount)

export const withSuffix = (suffix: string) => (renderer: BNRenderer) => (amount: BNLike) => renderer(amount) + suffix

export const asPercent = (renderer: BNRenderer) => (amount: BNLike) => renderer(BN.from(amount).mul(100)) + '%'

export const withLessThan = (renderer: BNRenderer) => (amount: BNLike) => {
  const result = renderer(amount)
  return result.match(/^[+-]?0\.0+$/) ? '~' + result : result
}

export const withRoundingMarker = (renderer: BNRenderer) => (amount: BNLike) => renderer(amount) + 'X'
