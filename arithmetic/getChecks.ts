import { BasicArithmetic, WithTernaryComparisons } from '../arithmetic'
import { CheckByBinary, CheckByUnary } from '../assert'

export interface WithBasicChecks<UnaryOut, BinaryOut, N> {
  byOne: CheckByUnary<UnaryOut, N>,
  byTwo: CheckByBinary<BinaryOut, N, N>,
  eq: BinaryOut,
  lt: BinaryOut,
  gt: BinaryOut,
  lte: BinaryOut,
  gte: BinaryOut,
}

export const getBasicChecks = <UnaryOut, BinaryOut, N>(checkByUnary: CheckByUnary<UnaryOut, N>, checkByBinary: CheckByBinary<BinaryOut, N, N>) => ({ eq, lt, gt, lte, gte }: BasicArithmetic<N>): WithBasicChecks<UnaryOut, BinaryOut, N> => ({
  byOne: checkByUnary,
  byTwo: checkByBinary,
  eq: checkByBinary(eq),
  lt: checkByBinary(lt),
  gt: checkByBinary(gt),
  lte: checkByBinary(lte),
  gte: checkByBinary(gte),
})

export const getTernaryChecks = <UnaryOut, BinaryOut, N>(checkByUnary: CheckByUnary<UnaryOut, N>, checkByBinary: CheckByBinary<BinaryOut, N, N>) => ({ gtelte, gtlte, gtelt, gtlt }: WithTernaryComparisons<N>) => ({
  gtelte: (lower: N, upper: N) => checkByUnary(gtelte(lower, upper), `gtelte(${lower}, ${upper})`),
  gtlte: (lower: N, upper: N) => checkByUnary(gtlte(lower, upper), `gtlte(${lower}, ${upper})`),
  gtelt: (lower: N, upper: N) => checkByUnary(gtelt(lower, upper), `gtelt(${lower}, ${upper})`),
  gtlt: (lower: N, upper: N) => checkByUnary(gtlt(lower, upper), `gtlt(${lower}, ${upper})`),
})
