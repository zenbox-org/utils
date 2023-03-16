import { BasicArithmetic } from '../arithmetic'
import { getShare } from '../arithmetic/getShare'
import { Quotient } from './index'

export const getQuotientOf = <N>(arithmetic: BasicArithmetic<N>) => ({ numerator, denominator }: Quotient<N>) => getShare(arithmetic)(denominator)(numerator)
