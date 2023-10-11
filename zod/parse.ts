import { ZodError, ZodSchema, ZodType, ZodTypeDef } from 'zod'
import { CompositeError, IndexedError } from '../error'

export const parseOneLog = <Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>) => (input: Input) => {
  const result = schema.safeParse(input)
  if (result.success) {
    return result.data
  } else {
    console.error('input', input)
    throw result.error
  }
}

export const parseManyLog = <Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>) => (inputs: Input[]) => {
  const parse = parseOneLog(schema)
  return inputs.map((input, index) => {
    try {
      return parse(input)
    } catch (e) {
      console.error('index', index)
      throw e
    }
  })
}

export function parseMany<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodType<Output, Def, Input>, inputs: Input[]) {
  const outputs = inputs.map(input => ({ input, result: schema.safeParse(input) }))
  const initial: ErrorsValues<IndexedError<Input, ZodError>, Output> = { errors: [], values: [] }
  const { values, errors } = outputs.reduce(({ errors, values }, { input, result }, index) => {
    if (result.success) {
      const value = result.data
      return { errors, values: values.concat([value]) }
    } else {
      const error = new IndexedError(input, index, result.error)
      return { errors: errors.concat([error]), values }
    }
  }, initial)
  if (errors.length) throw new CompositeError(errors)
  return values
}

export interface ErrorsValues<Err, Val> {
  errors: Err[]
  values: Val[]
}
