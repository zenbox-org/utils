import { BasicArithmetic } from '../arithmetic'
import { getShare } from '../arithmetic/getShare'
import { sum } from '../arithmetic/sum'
import { allEqual } from '../remeda/allEqual'
import { Quotient } from './index'

export const getQuotientOf = <N>(arithmetic: BasicArithmetic<N>) => ({ numerator, denominator }: Quotient<N>) => getShare(arithmetic)(denominator)(numerator)

export const isValidQuotientSum = <N>(a: BasicArithmetic<N>) => (quotients: Quotient<N>[]) => {
  if (quotients.length === 0) return true
  const numerators = quotients.map(q => q.numerator)
  const denominators = quotients.map(q => q.denominator)
  if (!allEqual(denominators)) return false
  if (sum(a)(numerators) > denominators[0]) return false
  return true
}
