import { AssertBinary, assertOne, assertTwo, AssertUnary } from '../assert'
import { getBasicChecks, getTernaryChecks, WithBasicChecks } from './getChecks'

// export const getAssertions = <N>(base: BasicArithmetic<N>, ternary: WithTernaryComparisons<N>) => ({
//   ...getBasicAssertions(base),
//   ...getTernaryAssertions(ternary),
// })

export type WithBasicAssertions<N> = WithBasicChecks<AssertUnary<N>, AssertBinary<N, N>, N>

export const getBasicAssertions = getBasicChecks(assertOne, assertTwo)

export const getTernaryAssertions = getTernaryChecks(assertOne, assertTwo)
