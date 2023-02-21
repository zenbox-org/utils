import { Arithmetic } from '../arithmetic'
import { assertBy } from '../assert'

export const getAssert = <N>({ eq, lt, gt, lte, gte }: Arithmetic<N>) => ({
  by: assertBy,
  eq: assertBy(eq),
  lt: assertBy(lt),
  gt: assertBy(gt),
  lte: assertBy(lte),
  gte: assertBy(gte),
})
