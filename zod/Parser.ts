import { ZodSchema, ZodTypeDef } from 'zod'

export const getParserFromSchema = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>) => (input: Input) => schema.safeParse(input)

export const getParserPFromSchema = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>) => (input: Input) => schema.safeParseAsync(input)
