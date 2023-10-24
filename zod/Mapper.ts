import { ZodSchema, ZodTypeDef } from 'zod'

export const getMapperFromSchema = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>) => (input: Input) => schema.parse(input)

export const getMapperPFromSchema = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>) => (input: Input) => schema.parseAsync(input)
