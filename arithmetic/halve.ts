import { Arithmetic } from '../arithmetic'

export const halve = <N>({ div, num }: Arithmetic<N>) => (value: N) => div(value, num(2))
