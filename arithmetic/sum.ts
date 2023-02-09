import { Arithmetic } from '../arithmetic'
import { getSummator } from './getSummator'

export const sum = <N>(arith: Arithmetic<N>) => (nums: N[]) => nums.reduce(getSummator(arith), arith.zero)

export const sumAmounts = <N>(arith: Arithmetic<N>) => (objects: { amount: N }[]) => sum(arith)(objects.map(b => b.amount))
