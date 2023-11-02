import $assert from 'assert'
import * as process from 'process'
import { equals, identity } from 'remeda'
import { RefinementCtx, ZodIssueCode } from 'zod'
import { isTrue } from './boolean'
import { Filter, FilterTwo } from './Filter'
import { fetchBooleanEnvVar } from './process'
import { includes } from './remeda/includes'
import { nequals } from './remeda/nequals'
import { toString } from './string'

export type CheckUnary<Out, A> = (a: A, $a: string, context?: Record<string, unknown>, $message?: string) => Out

export type CheckBinary<Out, A, B> = (a: A, b: B, $a: string, $b: string, context?: Record<string, unknown>, $message?: string) => Out

export type CheckByUnary<OutBy, A> = (filter: Filter<A>, $filter?: string) => OutBy

export type CheckByBinary<OutBy, A, B> = (filter: FilterTwo<A>, $filter?: string) => OutBy

export type AssertUnary<A> = CheckUnary<void, A>

export type AssertBinary<A, B> = CheckBinary<void, A, B>

export type AssertByUnary<A> = CheckByUnary<AssertUnary<A>, A>

export type AssertByBinary<A, B> = CheckByBinary<AssertBinary<A, B>, A, B>

export type GetErrorOutput = Error | undefined

export type GetErrorUnary<A> = CheckUnary<GetErrorOutput, A>

export type GetErrorBinary<A, B> = CheckBinary<GetErrorOutput, A, B>

export type GetErrorByUnary<A> = CheckByUnary<GetErrorUnary<A>, A>

export type GetErrorByBinary<A, B> = CheckByBinary<GetErrorBinary<A, B>, A, B>

export type RefineUnary<A> = (ctx: RefinementCtx) => CheckUnary<void, A>

export type RefineBinary<A, B> = (ctx: RefinementCtx) => CheckBinary<void, A, B>

export type RefineByUnary<A> = CheckByUnary<RefineUnary<A>, A>

export type RefineByBinary<A, B> = CheckByBinary<RefineBinary<A, B>, A, B>

const withContext = fetchBooleanEnvVar('ASSERT_WITH_CONTEXT', process.env.ASSERT_WITH_CONTEXT)

export const assertOne = <A>(filter: (a: A) => boolean, $filter = filter.name): AssertUnary<A> => (a: A, $a = `${a}`, context?: Record<string, unknown>, $message?: string) => {
  return $assert.strict(
    filter(a),
    getMessage($filter, [a], [$a], $message, context)
  )
}

export const assertTwo = <A, B = A>(filter: (a: A, b: B) => boolean, $filter = filter.name): AssertBinary<A, B> => (a: A, b: B, $a = `${a}`, $b = `${b}`, context?: Record<string, unknown>, $message?: string) => {
  return $assert.strict(
    filter(a, b),
    getMessage($filter, [a, b], [$a, $b], $message, context)
  )
}

export const getErrorOne = <A>(filter: (a: A) => boolean, $filter = filter.name): GetErrorUnary<A> => (a: A, $a = `${a}`, context?: Record<string, unknown>, $message?: string) => {
  return filter(a) ? undefined : new Error(getMessage($filter, [a], [$a], $message, context))
}

export const getErrorTwo = <A, B = A>(filter: (a: A, b: B) => boolean, $filter = filter.name): GetErrorBinary<A, B> => (a: A, b: B, $a = `${a}`, $b = `${b}`, context?: Record<string, unknown>, $message?: string) => {
  return filter(a, b) ? undefined : new Error(getMessage($filter, [a, b], [$a, $b], $message, context))
}

export const refineOneR = <A>(filter: (a: A) => boolean, $filter = filter.name): RefineUnary<A> => (ctx: RefinementCtx) => (a: A, $a = `${a}`, context?: Record<string, unknown>, $message?: string) => {
  if (!filter(a)) ctx.addIssue({ code: ZodIssueCode.custom, message: getMessage($filter, [a], [$a], $message), params: (context ?? {}) })
}

export const refineTwoR = <A, B = A>(filter: (a: A, b: B) => boolean, $filter = filter.name): RefineBinary<A, B> => (ctx: RefinementCtx) => (a: A, b: B, $a = `${a}`, $b = `${b}`, context?: Record<string, unknown>, $message?: string) => {
  if (!filter(a, b)) ctx.addIssue({ code: ZodIssueCode.custom, message: getMessage($filter, [a, b], [$a, $b], $message), params: (context ?? {}) })
}

export const refineOne = (ctx: RefinementCtx) => <A>(filter: (a: A) => boolean, $filter = filter.name) => refineOneR(filter, $filter)(ctx)

export const refineTwo = (ctx: RefinementCtx) => <A, B = A>(filter: (a: A, b: B) => boolean, $filter = filter.name) => refineTwoR(filter, $filter)(ctx)

export function getMessage($func: string, args: unknown[], $args: string[], $message?: string, context?: Record<string, unknown>) {
  return [
    [
      `${$func}(${$args.join(', ')})`,
      `${$func}(${args.map(toStringForAssert).join(', ')})`,
      $message,
    ].filter(identity).join(' ~ '),
    withContext ? toString(context) : '',
  ].filter(identity).join('\n')
}

export const toStringForAssert = (s: unknown) => toString(s === '' ? '<empty-string>' : s)

export const assertEq = assertTwo(equals)

export const assertNeq = assertTwo(nequals)

export const assertIncludes = assertTwo(includes)

export const assertTrue = assertOne(isTrue)
