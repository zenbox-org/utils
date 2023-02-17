import { identity, sumBy } from 'remeda'

export const sum = sumBy(identity<number>)
