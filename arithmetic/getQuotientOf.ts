import { Arithmetic } from '../arithmetic'
import { Quotient } from './Quotient'

export const getQuotientOf = <N>({ mul, div }: Arithmetic<N>) => ({ numerator, denominator }: Quotient<N>) => (num: N) => div(mul(num, numerator), denominator)
