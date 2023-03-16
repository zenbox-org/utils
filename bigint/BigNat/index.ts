import { isEqualSC } from 'libs/utils/lodash'
import { getArraySchema } from 'libs/utils/zod'
import { identity } from 'remeda'
import { z } from 'zod'

export const BigNatSchema = z.bigint().nonnegative().describe('BigNat')

export const BigNatsSchema = getArraySchema(BigNatSchema, identity)

export type BigNat = z.infer<typeof BigNatSchema>

export const parseBigNat = (nat: BigNat): BigNat => BigNatSchema.parse(nat)

export const parseBigNats = (nats: BigNat[]): BigNat[] => BigNatsSchema.parse(nats)

export const isEqualBigNat = isEqualSC
