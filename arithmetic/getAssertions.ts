import { AssertBinary, assertOne, assertTwo, AssertUnary } from '../assert'
import { BasicChecks, getBasicChecks } from './getBasicChecks'
import { getTernaryChecks } from './getTernaryChecks'

// export const getAssertions = <N>(base: BasicArithmetic<N>, ternary: WithTernaryComparisons<N>) => ({
//   ...getBasicAssertions(base),
//   ...getTernaryAssertions(ternary),
// })

export type BasicAssertions<N> = BasicChecks<AssertUnary<N>, AssertBinary<N, N>, N>

export const getBasicAssertions = getBasicChecks(assertOne, assertTwo)

export const getTernaryAssertions = getTernaryChecks(assertOne, assertTwo)
