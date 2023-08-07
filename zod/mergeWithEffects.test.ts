import { expect, test } from '@jest/globals'
import { ok } from 'assert'
import { z } from 'zod'
import { mergeWithEffect, mergeWithEffects } from './mergeWithEffects'

test(mergeWithEffect.name, () => {
  const a = z.object({ name: z.string() }).refine(({ name }) => name.length > 0)
  const b = z.object({ surname: z.string() })
  const merged = mergeWithEffect(a, b)
  const result = merged.safeParse({ name: '', surname: '' })
  ok(!result.success)
  expect(result.error.errors.length).toEqual(1)
})

test(mergeWithEffects.name, () => {
  const a = z.object({ name: z.string() }).refine(({ name }) => name.length > 0)
  const b = z.object({ surname: z.string() }).refine(({ surname }) => surname.length > 0)
  const merged = mergeWithEffects(a, b)
  const result = merged.safeParse({ name: '', surname: '' })
  ok(!result.success)
  expect(result.error.errors.length).toEqual(2)
})
