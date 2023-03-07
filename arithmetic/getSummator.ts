import { BasicArithmetic } from '../arithmetic'

export const getSummator = <N>(arith: BasicArithmetic<N>) => (total: N, amount: N) => arith.add(total, amount)
