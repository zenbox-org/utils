import { isEqualByDC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { BigNatSchema } from '../../bigint/BigNat'
import { sumEqOne, sumLteOne } from '../QuotientBigInt/QuotientBigIntSumComparators'

export const QuotientBigNatSchema = z.object({
  numerator: BigNatSchema,
  denominator: BigNatSchema,
})
  .refine(({ numerator, denominator }) => numerator <= denominator, 'assert(numerator <= denominator)')
  .describe('QuotientBigInt')

export const QuotientBigNatUidSchema = QuotientBigNatSchema

export const QuotientBigNatsSchema = getArraySchema(QuotientBigNatSchema, parseQuotientBigNatUid)

export const QuotientBigNatsSumLteOneSchema = QuotientBigNatsSchema.refine(sumLteOne, 'assert(sumLteOne)')

export const QuotientBigNatsSumEqOneSchema = QuotientBigNatsSchema.refine(sumEqOne, 'assert(sumEqOne)')

export type QuotientBigNat = z.infer<typeof QuotientBigNatSchema>

export type QuotientBigNatUid = z.infer<typeof QuotientBigNatUidSchema>

export function parseQuotientBigNat(quotient: QuotientBigNat): QuotientBigNat {
  return QuotientBigNatSchema.parse(quotient)
}

export function parseQuotientBigNats(quotients: QuotientBigNat[]): QuotientBigNat[] {
  return QuotientBigNatsSchema.parse(quotients)
}

export function parseQuotientBigNatUid(quotientUid: QuotientBigNatUid): QuotientBigNatUid {
  return QuotientBigNatUidSchema.parse(quotientUid)
}

export const isEqualQuotientBigNat = isEqualByDC(parseQuotientBigNatUid)
