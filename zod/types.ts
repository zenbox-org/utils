import { ZodObject } from 'zod'
import { objectInputType, objectOutputType, SafeParseReturnType, ZodRawShape, ZodTypeAny } from 'zod/lib/types'
import { ParseParams } from 'zod/lib/helpers/parseUtil'

export type UnknownKeysParam = 'passthrough' | 'strict' | 'strip'

export type ZodObjectStd<T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = 'strip', Catchall extends ZodTypeAny = ZodTypeAny> = ZodObject<T, UnknownKeys, Catchall, objectOutputType<T, Catchall>, objectInputType<T, Catchall>>

export type SafeParse<Input, Output> = (data: unknown, params?: Partial<ParseParams>) => SafeParseReturnType<Input, Output>
