import { BasicArithmetic } from '../arithmetic'
import { CheckByBinary, CheckByUnary } from '../assert'

export interface BasicChecks<UnaryOut, BinaryOut, N> {
  byOne: CheckByUnary<UnaryOut, N>,
  byTwo: CheckByBinary<BinaryOut, N, N>,
  eq: BinaryOut,
  lt: BinaryOut,
  gt: BinaryOut,
  lte: BinaryOut,
  gte: BinaryOut,
}

export const getBasicChecks = <UnaryOut, BinaryOut, N>(checkByUnary: CheckByUnary<UnaryOut, N>, checkByBinary: CheckByBinary<BinaryOut, N, N>) => ({ eq, lt, gt, lte, gte }: BasicArithmetic<N>): BasicChecks<UnaryOut, BinaryOut, N> => ({
  byOne: checkByUnary,
  byTwo: checkByBinary,
  eq: checkByBinary(eq),
  lt: checkByBinary(lt),
  gt: checkByBinary(gt),
  lte: checkByBinary(lte),
  gte: checkByBinary(gte),
})
