import { ZodSchema, ZodTypeDef } from 'zod'
import { getUntilMap, getUntilMapDefined } from '../Getter/getUntilValid'

export const getUntilMapSchema = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(max: number, schema: ZodSchema<Output, Def, Input>) => async (get: () => Promise<Input>): Promise<Output | undefined> => {
  const parse = async (value: Input) => schema.parse(value)
  return getUntilMap(get, parse)(max)
}

export const getUntilMapDefinedSchema = <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(max: number, schema: ZodSchema<Output, Def, Input>) => async (get: () => Promise<Input | undefined>): Promise<Output | undefined> => {
  const parse = async (value: Input) => schema.parse(value)
  return getUntilMapDefined(get, parse)(max)
}

