export default {}

// import { isEqualByDC } from 'libs/utils/lodash'
// import { getArraySchema } from 'libs/utils/zod'
// import { z, ZodSchema } from 'zod'
// import { ZodTypeDef } from 'zod/lib/types'
// import { HomoBasicComparators } from '../../arithmetic'
// import { sumEqOne, sumLteOne } from '../QuotientBigInt/QuotientBigIntSumComparators'
//
// export const QuotientGenSchema = <Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(comparisons: HomoBasicComparators<Output>) => (schema: ZodSchema<Output, Def, Input>) => {
//   return z.object({
//     numerator: schema,
//     denominator: schema,
//   })
//     .refine(({ numerator, denominator }) => comparisons.lte(numerator, denominator), 'assert(numerator <= denominator)')
//     .describe('QuotientGen')
// }
//
// export const QuotientGenUidSchema = QuotientGenSchema
//
// export const QuotientGensSchema = getArraySchema(QuotientGenSchema, parseQuotientGenUid)
//
// export const QuotientGensSumLteOneSchema = QuotientGensSchema.refine(sumLteOne, 'assert(sumLteOne)')
//
// export const QuotientGensSumEqOneSchema = QuotientGensSchema.refine(sumEqOne, 'assert(sumEqOne)')
//
// export type QuotientGen = z.infer<typeof QuotientGenSchema>
//
// export type QuotientGenUid = z.infer<typeof QuotientGenUidSchema>
//
// export function parseQuotientGen(quotient: QuotientGen): QuotientGen {
//   return QuotientGenSchema.parse(quotient)
// }
//
// export function parseQuotientGens(quotients: QuotientGen[]): QuotientGen[] {
//   return QuotientGensSchema.parse(quotients)
// }
//
// export function parseQuotientGenUid(quotientUid: QuotientGenUid): QuotientGenUid {
//   return QuotientGenUidSchema.parse(quotientUid)
// }
//
// export const isEqualQuotientGen = isEqualByDC(parseQuotientGenUid)
