import { BasicArithmetic } from '../arithmetic'

export const getShare = <N>({ mul, div, fromNumber }: BasicArithmetic<N>) => (denominator: N = fromNumber(100)) => (numerator: N) => (value: N) => div(mul(value, numerator), denominator)
