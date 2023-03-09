import { WithBasicAssertions } from '../arithmetic/getAssertions'
import { BigIntAllAssertions } from '../bigint/arithmetic'

export interface QuotientGen<N> {
  numerator: N
  denominator: N
}

type QuotientNum = QuotientGen<number>
type QuotientBigInt = QuotientGen<bigint>

const qa: QuotientNum = {
  numerator: 1,
  denominator: 10,
}
const qb: QuotientBigInt = {
  numerator: 10n,
  denominator: 1n,
}

export type QuotientGenTuple<N> = [N, N]

export const fromQuotientTupleToQuotient = <N>([numerator, denominator]: QuotientGenTuple<N>): QuotientGen<N> => ({ numerator, denominator })

export const fromQuotientToQuotientTuple = <N>({ numerator, denominator }: QuotientGen<N>): QuotientGenTuple<N> => [numerator, denominator]

export const parseQuotientGen = <N>(assert: WithBasicAssertions<N>) => ({ numerator, denominator }: QuotientGen<N>): QuotientGen<N> => {
  assert.lte(numerator, denominator, 'numerator', 'denominator')
  return { numerator, denominator }
}

export const parseQuotientGenBigInt = parseQuotientGen(BigIntAllAssertions)
