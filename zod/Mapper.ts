import { ZodSchema, ZodTypeDef } from 'zod'

export const getMapper = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>) => (input: Input) => schema.parse(input)

export const getMapperP = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>) => (input: Input) => schema.parseAsync(input)
