import { BasicArithmetic } from '../arithmetic'

export const getShare = <N>({ mul, div, num }: BasicArithmetic<N>) => (denominator: N = num(100)) => (numerator: N) => (value: N) => div(mul(value, numerator), denominator)
