import { BasicArithmetic } from '../arithmetic'
import { getShare } from './getShare'
import { Quotient } from './Quotient'

export const getQuotientOf = <N>(arithmetic: BasicArithmetic<N>) => ({ numerator, denominator }: Quotient<N>) => getShare(arithmetic)(denominator)(numerator)
