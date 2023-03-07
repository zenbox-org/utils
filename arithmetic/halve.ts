import { BasicArithmetic } from '../arithmetic'

export const halve = <N>({ div, num }: BasicArithmetic<N>) => (value: N) => div(value, num(2))
