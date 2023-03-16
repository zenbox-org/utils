import { BigIntBasicRefinesR } from './BigIntBasicRefinesR'
import { BigIntTernaryRefinesR } from './BigIntTernaryRefinesR'

export const BigIntAllRefinesR = {
  ...BigIntBasicRefinesR,
  ...BigIntTernaryRefinesR,
}

export const refineR = BigIntAllRefinesR
