import { equals } from 'remeda'

export const allEqual = <T>(array: T[]) => array.length === 0 || array.every(equals(array[0]))
