import { uniq } from 'remeda'

export const allUnique = <T>(array: T[]) => uniq(array).length === array.length
