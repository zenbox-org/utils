import { ZodObject } from 'zod'
import { AnyZodObject, objectInputType, objectOutputType, UnknownKeysParam, ZodEffects, ZodRawShape, ZodTypeAny } from 'zod/lib/types'
import { addEffect } from './addEffect'

export const mergeWithEffect = <Incoming extends AnyZodObject, T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny, Output = objectOutputType<T, Catchall, UnknownKeys>, Input = objectInputType<T, Catchall, UnknownKeys>>(a: ZodEffects<ZodObject<T, UnknownKeys, Catchall, Output, Input>>, b: Incoming) => {
  return addEffect(a.innerType().merge(b), a._def.effect)
}

export const mergeWithEffects = <aT extends ZodRawShape, bT extends ZodRawShape, aUnknownKeys extends UnknownKeysParam = UnknownKeysParam, aCatchall extends ZodTypeAny = ZodTypeAny, bUnknownKeys extends UnknownKeysParam = UnknownKeysParam, bCatchall extends ZodTypeAny = ZodTypeAny, aOutput = objectOutputType<aT, aCatchall, aUnknownKeys>, aInput = objectInputType<aT, aCatchall, aUnknownKeys>, bOutput extends { [x: string]: unknown } = objectOutputType<bT, bCatchall, bUnknownKeys>, bInput extends { [x: string]: unknown } = objectInputType<bT, bCatchall, bUnknownKeys>>(a: ZodEffects<ZodObject<aT, aUnknownKeys, aCatchall, aOutput, aInput>>, b: ZodEffects<ZodObject<bT, bUnknownKeys, bCatchall, bOutput, bInput>>) => {
  const base = a.innerType().merge(b.innerType())
  return addEffect(addEffect(base, a._def.effect), b._def.effect)
}
