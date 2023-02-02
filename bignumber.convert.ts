import { BN } from '../bn'
import { BigNumber } from './bignumber'

export type BNRenderer = (amount: BN) => string

const ten = new BigNumber(10)

const bn2num = (n: BN) => new BigNumber(n.toString())

export const toFrontendAmountBigNumS = (scale: BigNumber) => (amount: BigNumber) => amount.dividedBy(scale)

export const toFrontendAmountBigNumD = (decimals: BigNumber) => toFrontendAmountBigNumS(ten.pow(decimals))

export const toRoundedAmountBigNumD = (decimals: BigNumber, roundingPlaces: number, roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_HALF_DOWN) => (amount: BigNumber) => toFrontendAmountBigNumD(decimals)(amount).toFixed(roundingPlaces, roundingMode)

export const toBackendAmountBigNumD = (decimals: BigNumber) => (amount: BigNumber) => new BigNumber(amount).multipliedBy(ten.pow(decimals))

export const toRoundedAmountBigNum = (roundingPlaces: number, roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_HALF_DOWN) => (amount: BigNumber) => new BigNumber(amount).toFixed(roundingPlaces, roundingMode)

export const toFrontendAmountBND = (decimals: BN) => (amount: BN) => toFrontendAmountBigNumD(bn2num(decimals))(bn2num(amount))

export const toFrontendAmountBNS = (scale: BN) => (amount: BN) => toFrontendAmountBigNumS(bn2num(scale))(bn2num(amount))

export const toRoundedAmountBND = (decimals: BN, roundingPlaces: number, roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_HALF_DOWN) => (amount: BN) => toFrontendAmountBigNumD(bn2num(decimals))(bn2num(amount)).toFixed(roundingPlaces, roundingMode)

export const toBackendAmountBND = (decimals: BN) => (amount: BigNumber) => BN.from(toBackendAmountBigNumD(bn2num(decimals))(amount).toFixed())

export const toRenderedAmountBND = (decimals: BN) => (amount: BN) => toFrontendAmountBND(decimals)(amount).toFixed()

export const toRenderedAmountBNS = (scale: BN) => (amount: BN) => toFrontendAmountBNS(scale)(amount).toFixed()

export const withSign = (renderer: BNRenderer) => (amount: BN) => (BN.from(amount).isNegative() ? '' : '+') + renderer(amount)

export const withSuffix = (suffix: string) => (renderer: BNRenderer) => (amount: BN) => renderer(amount) + suffix

export const asPercent = (renderer: BNRenderer) => (amount: BN) => renderer(BN.from(amount).mul(100)) + '%'

export const withLessThan = (renderer: BNRenderer) => (amount: BN) => {
  const result = renderer(amount)
  return result.match(/^[+-]?0\.0+$/) ? '~' + result : result
}

export const withRoundingMarker = (marker: string) => (renderer: BNRenderer) => (amount: BN) => renderer(amount) + marker

export const withRoundingMarkerE = withRoundingMarker('…')

export const withRoundingMarkerP = withRoundingMarker('+')
