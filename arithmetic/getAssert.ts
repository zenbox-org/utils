import { Arithmetic } from '../arithmetic'
import { assertByBinary, assertByUnary } from '../assert'

export const getAssert = <N>({ eq, lt, gt, lte, gte, gtelte, gtlte, gtelt, gtlt }: Arithmetic<N>) => ({
  by: assertByBinary,
  eq: assertByBinary(eq),
  lt: assertByBinary(lt),
  gt: assertByBinary(gt),
  lte: assertByBinary(lte),
  gte: assertByBinary(gte),
  gtelte: (lower: N, upper: N) => assertByUnary(gtelte(lower, upper), `gtelte(${lower}, ${upper})`),
  gtlte: (lower: N, upper: N) => assertByUnary(gtlte(lower, upper), `gtlte(${lower}, ${upper})`),
  gtelt: (lower: N, upper: N) => assertByUnary(gtelt(lower, upper), `gtelt(${lower}, ${upper})`),
  gtlt: (lower: N, upper: N) => assertByUnary(gtlt(lower, upper), `gtlt(${lower}, ${upper})`),
})
