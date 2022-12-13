import { difference, equals } from 'remeda'
import { RefinementCtx, SafeParseReturnType, z, ZodError, ZodIssueCode, ZodSchema, ZodType, ZodTypeDef } from 'zod'
import { ensure } from './ensure'
import { isEqualByD } from './lodash'
import { byUid, Uid } from './uid'

export interface ZodFlatError {
  formErrors: string[];
  fieldErrors: {
    [k: string]: string[];
  };
}

export type GetUid<UidHolder> = (holder: UidHolder) => Uid

export type Validate<Obj> = (object: Obj) => Obj

export type Insert<Obj> = (object: Obj) => Obj

export interface Model<Obj, UidHolder> {
  schema: ZodSchema<Obj>,
  validate: Validate<Obj>
  getUid: GetUid<Obj>
}

export interface Stat {
  uid: Uid
  count: number
}

export type GetUniqueValue<Obj> = (object: Obj) => unknown

export function getArraySchema<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>, getUniqueValue: GetUniqueValue<Output>) {
  return z.array(schema).superRefine(getDuplicatesRefinement(ensure(schema.description), getUniqueValue))
}

export function getDuplicatesRefinement<Obj>(name: string, getUniqueValue: GetUniqueValue<Obj>) {
  return function (objects: Obj[], context: RefinementCtx) {
    try {
      const stats = getDuplicateStats(objects, getUniqueValue)
      stats.map(stat => context.addIssue({
        code: ZodIssueCode.custom,
        params: stat,
        message: `Found ${name} duplicates: ${JSON.stringify(stat)}`,
      }))
    } catch (error) {
      context.addIssue({
        code: ZodIssueCode.custom,
        params: { error },
        message: `Error while counting ${name} duplicates`,
      })
    }
  }
}

export function getDuplicateStats<Obj>(objects: Obj[], getUniqueValue: GetUniqueValue<Obj>) {
  const stats = getUniqueCountStats(objects, getUniqueValue)
  return stats.filter(stat => stat.count > 1)
}

export function getUniqueCountStats<Obj>(objects: Obj[], getUniqueValue: GetUniqueValue<Obj>): Stat[] {
  const stats: Stat[] = []
  return objects.reduce<Stat[]>((stats, value) => {
    const uid = getUniqueValue(value)
    const index = stats.findIndex(s => equals(s.uid, uid))
    if (~index) {
      stats[index].count++
    } else {
      stats.push({ uid, count: 1 })
    }
    return stats
  }, stats)
}

export const insert = (name: string) => <Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodType<Output, Def, Input>) => (getUid: GetUid<Output>) => (array: Array<Output>) => (object: Input) => {
  try {
    const $object = schema.parse(object)
    const duplicate = array.find(o => isEqualByD(o, $object, getUid))
    if (duplicate) throw new Error(`Duplicate ${name} found: ${JSON.stringify(getUid(duplicate))}`)
    array.push($object)
    return $object
  } catch (error) {
    throw { object, error }
  }
}

export function getGenericInserter<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(name: string, schema: ZodType<Output, Def, Input>, getUid: GetUid<Output>) {
  return insert(name)(schema)(getUid)
}

export function getInserter<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(name: string, schema: ZodType<Output, Def, Input>, getUid: GetUid<Output>, array: Array<Output>) {
  return insert(name)(schema)(getUid)(array)
}

export function getMultiInserter<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(name: string, schema: ZodType<Output, Def, Input>, getUid: GetUid<Output>, array: Array<Output>) {
  const inserter = insert(name)(schema)(getUid)(array)
  return (objects: Array<Input>) => objects.map(inserter)
}

// export function getInserterWithDefaults<Output extends object, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(name: string, schema: ZodType<Output, Def, Input>, getUid: GetUid<Output>, array: Array<Output>, defaults: Partial<Input>) {
//   const doInsert = insert(name)(schema)(getUid)(array)
//   return (object: Input) => doInsert(merge({}, defaults, object))
// }

export function getFinder<UidHolder, Output extends UidHolder>(getUid: GetUid<UidHolder>, array: Array<Output>) {
  return function (uidHolder: UidHolder) {
    return array.find(byUid(getUid, uidHolder))
  }
}

export function getName<T>(schema: ZodSchema<T>) {
  const description = ensure(schema.description, new Error(`Cannot get schema name: ${JSON.stringify(schema)}`))
  const [name] = description.split(' ')
  return name
}

export const mustIncludeAllOf = <El>(required: El[]) => (elements: El[]) => difference(required, elements).length === 0

export function getErrorReports<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(results: SafeParseReturnType<Input, Output>[], schema: ZodType<Output, Def, Input>) {
  const errors = results.reduce(function (reports: ErrorReport<Input>[], result, index) {
    if (result.success) {
      return reports
    } else {
      const report = {
        index,
        error: result.error,
      }
      return reports.concat([report])
    }
  }, [])
  return errors
}

export interface ErrorReport<Product> {
  index: number,
  error: ZodError<Product>
}
