import { z } from 'zod'
import { AnyZodObject } from 'zod/lib/types'

export const getDiscriminatedUnionSchema = <Key extends string, Value extends string>(key: Key, value: Value) => <Schema extends AnyZodObject>(schema: Schema) => z.object({ type: z.literal(value) }).merge(schema)
