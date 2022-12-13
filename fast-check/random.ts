import { Random } from 'fast-check'
import prand from 'pure-rand'

export const random = new Random(prand.xoroshiro128plus(Date.now()))
