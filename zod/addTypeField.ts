import { objectInputType, objectOutputType, ZodObject, ZodRawShape, ZodTypeAny } from 'zod/lib/types'
import { UnknownKeysParam } from './types'
import { z } from 'zod'

export const addTypeField = <T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = 'strip', Catchall extends ZodTypeAny = ZodTypeAny>(name: string, schema: ZodObject<T, UnknownKeys, Catchall, objectOutputType<T, Catchall>, objectInputType<T, Catchall>>) => z.object({
  type: z.literal(name),
}).merge(schema).describe(name)
