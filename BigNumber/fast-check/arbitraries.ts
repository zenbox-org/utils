import { BigIntConstraints } from 'fast-check/lib/types/arbitrary/bigInt'
import { bigInt } from 'fast-check'
import { bigint2bignum } from '../utils'

export const bigNum = (constraints: BigIntConstraints) => bigInt(constraints).map(bigint2bignum)

export const bigNumZero = (constraints?: BigIntConstraints) => bigNum({ min: BigInt(0), ...constraints })

export const bigNumOne = (constraints?: BigIntConstraints) => bigNum({ min: BigInt(1), ...constraints })
