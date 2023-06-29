import BigNumber from 'bignumber.js'
import { isEqualByDC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { z } from 'zod'
import { sumEqOne, sumLteOne } from './QuotientBigNumberSumComparators'

export const QuotientBigNumberSchema = z.object({
  numerator: z.instanceof(BigNumber),
  denominator: z.instanceof(BigNumber),
})
  .refine(({ numerator, denominator }) => numerator.lte(denominator), 'assert(numerator <= denominator)')
  .describe('QuotientBigNumber')

export const QuotientBigNumberUidSchema = QuotientBigNumberSchema

export const QuotientBigNumbersSchema = getArraySchema(QuotientBigNumberSchema, parseQuotientBigNumberUid)

export const QuotientBigNumbersSumLteOneSchema = QuotientBigNumbersSchema.refine(sumLteOne, 'assert(sumLteOne)')

export const QuotientBigNumbersSumEqOneSchema = QuotientBigNumbersSchema.refine(sumEqOne, 'assert(sumEqOne)')

export type QuotientBigNumber = z.infer<typeof QuotientBigNumberSchema>

export type QuotientBigNumberUid = z.infer<typeof QuotientBigNumberUidSchema>

export function parseQuotientBigNumber(quotient: QuotientBigNumber): QuotientBigNumber {
  return QuotientBigNumberSchema.parse(quotient)
}

export function parseQuotientBigNumbers(quotients: QuotientBigNumber[]): QuotientBigNumber[] {
  return QuotientBigNumbersSchema.parse(quotients)
}

export function parseQuotientBigNumberUid(quotientUid: QuotientBigNumberUid): QuotientBigNumberUid {
  return QuotientBigNumberUidSchema.parse(quotientUid)
}

export const isEqualQuotientBigNumber = isEqualByDC(parseQuotientBigNumberUid)
