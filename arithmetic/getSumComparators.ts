import { BasicArithmetic } from '../arithmetic'
import { sum } from './sum'

export const sumEqOne = <N>(arithmetic: BasicArithmetic<N>) => (values: N[]) => arithmetic.eq(sum(arithmetic)(values), arithmetic.one)

export const sumLtOne = <N>(arithmetic: BasicArithmetic<N>) => (values: N[]) => arithmetic.lt(sum(arithmetic)(values), arithmetic.one)

export const sumGtOne = <N>(arithmetic: BasicArithmetic<N>) => (values: N[]) => arithmetic.gt(sum(arithmetic)(values), arithmetic.one)

export const sumLteOne = <N>(arithmetic: BasicArithmetic<N>) => (values: N[]) => arithmetic.lte(sum(arithmetic)(values), arithmetic.one)

export const sumGteOne = <N>(arithmetic: BasicArithmetic<N>) => (values: N[]) => arithmetic.gte(sum(arithmetic)(values), arithmetic.one)

export const getSumComparators = <N>(arithmetic: BasicArithmetic<N>) => {
  return {
    sumEqOne: sumEqOne(arithmetic),
    sumLtOne: sumLtOne(arithmetic),
    sumGtOne: sumGtOne(arithmetic),
    sumLteOne: sumLteOne(arithmetic),
    sumGteOne: sumGteOne(arithmetic),
  }
}
