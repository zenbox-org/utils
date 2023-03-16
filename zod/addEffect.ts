import { Effect, z, ZodType } from 'zod'
import { ZodTypeDef } from 'zod/lib/types'

export const addEffect = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output, Base extends ZodType<Output, Def, Input> = ZodType<Output, Def, Input>>(base: Base, effect: Effect<unknown>) => {
  switch (effect.type) {
    case 'preprocess':
      return z.preprocess(effect.transform, base)
    case 'transform':
      return base.transform(effect.transform)
    case 'refinement':
      return base.superRefine(effect.refinement)
  }
}
