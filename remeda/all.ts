import { identity } from 'remeda'

export const all = <T>(array: T[]) => array.every(identity)
