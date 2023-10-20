import { ZodSchema, ZodTypeDef } from 'zod'
import { getUntilParse, getUntilParseDefined } from '../Getter/getUntilValid'

export const getUntilParseSchema = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(max: number, schema: ZodSchema<Output, Def, Input>) => async (get: () => Promise<Input>): Promise<Output | undefined> => {
  const parse = async (value: Input) => schema.parse(value)
  return getUntilParse(max, parse)(get)
}

export const getUntilParseDefinedSchema = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(max: number, schema: ZodSchema<Output, Def, Input>) => async (get: () => Promise<Input | undefined>): Promise<Output | undefined> => {
  const parse = async (value: Input) => schema.parse(value)
  return getUntilParseDefined(max, parse)(get)
}
