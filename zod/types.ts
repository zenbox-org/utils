import { ZodObject } from 'zod'
import { objectInputType, objectOutputType, ZodRawShape, ZodTypeAny } from 'zod/lib/types'

export type UnknownKeysParam = 'passthrough' | 'strict' | 'strip'

export type ZodObjectStd<T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = 'strip', Catchall extends ZodTypeAny = ZodTypeAny> = ZodObject<T, UnknownKeys, Catchall, objectOutputType<T, Catchall>, objectInputType<T, Catchall>>
