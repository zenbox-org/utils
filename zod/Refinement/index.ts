import { RefinementCtx } from 'zod'

export type Refinement<T> = (value: T, ctx: RefinementCtx) => void

export type RefinementWithCheck<T> = (value: T, ctx: RefinementCtx,) => void
