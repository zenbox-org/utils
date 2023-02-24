import { Numeral } from './types'

export const compareNumerals = <T extends Numeral>(a: T, b: T) => (a < b) ? -1 : ((a > b) ? 1 : 0)
