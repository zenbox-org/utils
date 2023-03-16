import { BasicArithmetic } from '../arithmetic'
import { assertTwo } from '../assert'
import { Quotient } from '../Quotient'
import { getQuotientOf } from '../Quotient/getQuotientOf'

/**
 * Produces an array of values where:
 * - each value >= valueMin
 * - sum of values <= sumMax (which implies that each value <= sumMax, too)
 *
 * IMPORTANT: the second parameter is valueSumMax, not valueMax
 */
export const getBoundedArrayFromQuotients = <N>(arithmetic: BasicArithmetic<N>) => (valueMin: N, valueSumMax: N) => (quotients: Quotient<N>[]) => {
  const { zero, one, fromNumber, add, sub, mul, div, min, max, abs, sqrt, eq, lt, gt, lte, gte } = arithmetic
  const valueSumMin = mul(valueMin, fromNumber(quotients.length))
  const valueSumMaxLocal = sub(valueSumMax, valueSumMin)
  const getQuotientArith = getQuotientOf(arithmetic)
  assertTwo(gt)(valueSumMaxLocal, zero, 'valueSumMaxLocal', 'zero')
  return quotients.map(quotient => add(getQuotientArith(quotient)(valueSumMaxLocal), valueMin))
}
