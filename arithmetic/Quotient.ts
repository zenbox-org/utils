import { BasicArithmetic } from '../arithmetic'
import { allEqual } from '../remeda/allEqual'
import { sum } from './sum'

export interface Quotient<N> {
  numerator: N
  denominator: N
}

export const isValidQuotientSum = <N>(a: BasicArithmetic<N>) => (quotients: Quotient<N>[]) => {
  if (quotients.length === 0) return true
  const numerators = quotients.map(q => q.numerator)
  const denominators = quotients.map(q => q.denominator)
  if (!allEqual(denominators)) return false
  if (sum(a)(numerators) > denominators[0]) return false
  return true
}
