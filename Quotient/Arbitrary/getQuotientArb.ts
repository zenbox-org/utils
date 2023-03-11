import { tuple } from 'fast-check'
import { Arbitrary } from 'fast-check/lib/types/check/arbitrary/definition/Arbitrary'
import { Comparator } from '../../comparator'

type Gen<N> = (constraints: { min?: N; }) => Arbitrary<N>

export const getQuotientArb = <N>(gen: Gen<N>, zero: N, comparator: Comparator<N>) => {
  const arb = gen({ min: zero })
  return tuple(arb, arb).map(nums => {
    const [numerator, denominator] = nums.sort(comparator)
    return { numerator, denominator }
  })
}
