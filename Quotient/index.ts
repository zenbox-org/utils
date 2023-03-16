import { BasicArithmetic } from '../arithmetic'
import { WithBasicAssertions } from '../arithmetic/getAssertions'
import { BigIntAllAssertions } from '../bigint/BigIntAllAssertions'
import { BigIntBasicArithmetic } from '../bigint/BigIntBasicArithmetic'

export interface Quotient<N> {
  numerator: N
  denominator: N
}

export type QuotientTuple<N> = [N, N]

export const fromQuotientTupleToQuotient = <N>([numerator, denominator]: QuotientTuple<N>): Quotient<N> => ({ numerator, denominator })

export const fromQuotientToQuotientTuple = <N>({ numerator, denominator }: Quotient<N>): QuotientTuple<N> => [numerator, denominator]

export const parseQuotientGen = <N>({ zero }: BasicArithmetic<N>, assert: WithBasicAssertions<N>) => ({ numerator, denominator }: Quotient<N>): Quotient<N> => {
  assert.lte(numerator, denominator, 'numerator', 'denominator')
  assert.gte(denominator, zero, 'denominator', 'zero')
  return { numerator, denominator }
}

export const parseQuotientGenBigInt = parseQuotientGen(BigIntBasicArithmetic, BigIntAllAssertions)
