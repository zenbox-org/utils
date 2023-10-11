import { BasicArithmetic } from '../arithmetic'
import { toArray } from '../IterableIterator/fun'
import { getSummator } from './getSummator'

export const sum = <N>(arith: BasicArithmetic<N>) => (nums: N[]) => nums.reduce(getSummator(arith), arith.zero)

export const sumMap = <N>(arith: BasicArithmetic<N>) => (nums: Map<unknown, N>) => sum(arith)(toArray(nums.values()))

export const sumAmounts = <N>(arith: BasicArithmetic<N>) => (objects: { amount: N }[]) => sum(arith)(objects.map(b => b.amount))
