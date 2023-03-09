import { BasicArithmetic, WithTernaryComparisons } from '../arithmetic'
import { AssertBinary, assertByBinary, assertByUnary } from '../assert'

export const getAssertions = <N>(base: BasicArithmetic<N>, ternary: WithTernaryComparisons<N>) => ({
  ...getBasicAssertions(base),
  ...getTernaryAssertions(ternary),
})

export interface WithBasicAssertions<N> {
  oneBy: typeof assertByUnary,
  twoBy: typeof assertByBinary,
  eq: AssertBinary<N, N>,
  lt: AssertBinary<N, N>,
  gt: AssertBinary<N, N>,
  lte: AssertBinary<N, N>,
  gte: AssertBinary<N, N>,
}

export const getBasicAssertions = <N>({ eq, lt, gt, lte, gte }: BasicArithmetic<N>): WithBasicAssertions<N> => ({
  oneBy: assertByUnary,
  twoBy: assertByBinary,
  eq: assertByBinary(eq),
  lt: assertByBinary(lt),
  gt: assertByBinary(gt),
  lte: assertByBinary(lte),
  gte: assertByBinary(gte),
})

export const getTernaryAssertions = <N>({ gtelte, gtlte, gtelt, gtlt }: WithTernaryComparisons<N>) => ({
  gtelte: (lower: N, upper: N) => assertByUnary(gtelte(lower, upper), `gtelte(${lower}, ${upper})`),
  gtlte: (lower: N, upper: N) => assertByUnary(gtlte(lower, upper), `gtlte(${lower}, ${upper})`),
  gtelt: (lower: N, upper: N) => assertByUnary(gtelt(lower, upper), `gtelt(${lower}, ${upper})`),
  gtlt: (lower: N, upper: N) => assertByUnary(gtlt(lower, upper), `gtlt(${lower}, ${upper})`),
})
