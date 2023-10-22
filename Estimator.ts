import { BigNumber, multBigNumbers, num, one } from './BigNumber/utils'
import { todo } from './todo'

export type Estimator<Opt, Num> = (option: Opt) => Num

export type EstimatorP<Opt, Num> = (option: Opt) => Promise<Num>

export type EstimatorBigNum<Opt> = Estimator<Opt, BigNumber>

export type EstimatorBigNumP<Opt> = EstimatorP<Opt, BigNumber>

export type MultiEstimator<Opt, Num> = (option: Opt) => Num[]

export type MultiEstimatorP<Opt, Num> = (option: Opt) => Promise<Num[]>

export type MultiEstimatorBigNum<Opt> = MultiEstimator<Opt, BigNumber>

export type MultiEstimatorBigNumP<Opt> = MultiEstimatorP<Opt, BigNumber>

export const AlwaysOne = () => num(1)

export const AlwaysOneP = async () => num(1)

export const utilityBigNum = <Opt>(getGain: EstimatorBigNum<Opt>, getLoss: EstimatorBigNum<Opt>) => {
  return function (option: Opt) {
    return getGain(option).dividedBy(getLoss(option))
  }
}

export const utilityByFactorsBigNum = <Opt>(getGainFactors: MultiEstimatorBigNum<Opt>, getLossFactors: MultiEstimatorBigNum<Opt>) => {
  return function (option: Opt) {
    const gain = multBigNumbers(getGainFactors(option))
    const loss = multBigNumbers(getLossFactors(option))
    return gain.dividedBy(loss)
  }
}

export const ubn = utilityBigNum

export const ufbn = utilityByFactorsBigNum

export const TodoEstimator = <Opt, Num>(option: Opt): Num => { return todo<Num>() }

export const TodoEstimatorP = async <Opt, Num>(option: Opt): Promise<Num> => { return todo<Num>() }

export const TodoEstimatorBigNumP = async <Opt>(option: Opt): Promise<BigNumber> => { return todo() }

export const TodoEstimatorBigNum = <Opt>(option: Opt): BigNumber => { return todo() }

export const invert = (n: BigNumber) => one.dividedBy(n)

export const invertE = <Opt>(e: EstimatorBigNum<Opt>) => {
  return (option: Opt) => one.dividedBy(e(option))
}
