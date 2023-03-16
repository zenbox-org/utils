import { BasicArithmetic } from '../arithmetic'

export const halve = <N>({ div, fromNumber }: BasicArithmetic<N>) => (value: N) => div(value, fromNumber(2))
