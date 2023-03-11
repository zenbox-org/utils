import { BasicArithmetic } from '../arithmetic'
import { sum } from '../arithmetic/sum'

export const getQuotientsFromNumerators = <N>(arithmetic: BasicArithmetic<N>) => (numerators: N[]) => {
  const denominator = sum(arithmetic)(numerators)
  return numerators.map(numerator => ({ numerator, denominator }))
}
