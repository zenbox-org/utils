import { RefinementCtx } from 'zod'
import { RefineBinary, refineOne, refineOneR, refineTwo, refineTwoR, RefineUnary } from '../assert'
import { BasicChecks, getBasicChecks } from './getBasicChecks'
import { getTernaryChecks } from './getTernaryChecks'

export type WithBasicRefines<N> = BasicChecks<RefineUnary<N>, RefineBinary<N, N>, N>

export const getBasicRefinesR = getBasicChecks(refineOneR, refineTwoR)

export const getTernaryRefinesR = getTernaryChecks(refineOneR, refineTwoR)

export const getRefines = (ctx: RefinementCtx) => getBasicChecks(refineOne(ctx), refineTwo(ctx))
// export const getBasicRefines = <N>(arithmetic: BasicArithmetic<N>): WithBasicChecks<RefineUnary<N>, RefineBinary<N, N>, N> => ({
//   ...getBasicChecks(refineByUnary, refineByBinary)(arithmetic),
//   oneBy: (ctx: RefinementCtx) => (filter: Filter<N>, $filter: string) => refineByUnary<N>(filter, $filter)(ctx),

// })
