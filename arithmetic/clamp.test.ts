import { bigInt, tuple } from 'fast-check'
import { BigIntBasicArithmetic } from '../bigint/arithmetic'
import { assertPD } from '../fast-check/assert'
import { clamp } from './clamp'

test(clamp.name + 'Static', async function () {
  const clampLocal = clamp(BigIntBasicArithmetic)(2n, 5n)
  expect(clampLocal(1n)).toEqual(3n)
  expect(clampLocal(2n)).toEqual(4n)
  expect(clampLocal(3n)).toEqual(2n)
  expect(clampLocal(10n)).toEqual(3n)
})

test(clamp.name + 'Dynamic', async function () {
  const lowerArb = bigInt({ min: 0n })
  const upperIncrementArb = bigInt({ min: 1n })
  const boundsArb = tuple(lowerArb, upperIncrementArb).map(([lower, upperIncrement]) => [lower, lower + upperIncrement])
  const valueArb = bigInt({ min: 0n })
  return assertPD(boundsArb, valueArb, async ([lower, upper], value) => {
    const clampLocal = clamp(BigIntBasicArithmetic)(lower, upper)
    const valueClamped = clampLocal(value)
    expect(valueClamped).toBeGreaterThanOrEqual(lower)
    expect(valueClamped).toBeLessThan(upper)
  })
})
