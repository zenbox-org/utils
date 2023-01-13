import { BN, BNLike } from '../bn'
import { BigNumber } from './bignumber'

const ten = new BigNumber(10)

export const toFrontendAmountBigNumD = (decimals: BigNumber.Value) => (amount: BigNumber.Value) => new BigNumber(amount).dividedBy(ten.pow(decimals))

export const toRoundedAmountBigNumD = (decimals: BigNumber.Value, roundingPlaces: number, roundingMode?: BigNumber.RoundingMode) => (amount: BigNumber.Value) => toFrontendAmountBigNumD(decimals)(amount).toFixed(roundingPlaces, roundingMode)

export const toBackendAmountBigNumD = (decimals: BigNumber.Value) => (amount: BigNumber.Value) => new BigNumber(amount).multipliedBy(ten.pow(decimals))

export const toFrontendAmountBND = (decimals: BNLike) => (amount: BNLike) => toFrontendAmountBigNumD(decimals.toString())(amount.toString())

export const toRoundedAmountBND = (decimals: BNLike, roundingPlaces: number, roundingMode?: BigNumber.RoundingMode) => (amount: BNLike) => toFrontendAmountBigNumD(decimals.toString())(amount.toString()).toFixed(roundingPlaces, roundingMode)

export const toBackendAmountBND = (decimals: BNLike) => (amount: BigNumber.Value) => BN.from(toBackendAmountBigNumD(decimals.toString())(amount).toFixed())
