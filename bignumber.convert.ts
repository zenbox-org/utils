import { BN, BNLike } from '../bn'
import { BigNumber } from './bignumber'

const ten = new BigNumber(10)

export function toBackendAmount(amount: BigNumber.Value, decimals: BigNumber.Value): BigNumber {
  // return BigNumber.from(amount * Math.pow(10, decimals))
  // return parseUnits(amount.toFixed(decimals), decimals)
  return ten.pow(decimals).multipliedBy(amount)
}

export function toBackendAmountBN(amount: BigNumber.Value, decimals: BigNumber.Value): BN {
  return BN.from(toBackendAmount(amount, decimals).toFixed())
}

export function toFrontendAmount(amount: BigNumber.Value, decimals: BigNumber.Value): BigNumber {
  return new BigNumber(amount).dividedBy(ten.pow(decimals))
}

export function toFrontendAmountBN(amount: BNLike, decimals: BigNumber.Value): BigNumber {
  return toFrontendAmount(amount.toString(), decimals)
}

export const toEthString = (amount: BNLike) => toFrontendAmountBN(amount, 18).toString()
