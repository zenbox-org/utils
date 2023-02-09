import { Arithmetic } from '../arithmetic'

export const getSummator = <N>(arith: Arithmetic<N>) => (total: N, amount: N) => arith.add(total, amount)
