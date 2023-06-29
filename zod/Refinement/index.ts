import { RefinementCtx } from 'zod'

export type RefinementVoid<In> = (input: In, ctx: RefinementCtx) => void

export type RefinementTypeAssertion<In, Out extends In> = (input: In, ctx: RefinementCtx) => input is Out

export { oneToMany } from './oneToMany'
