import { flatten } from 'remeda'
import { Mapper } from '../Mapper'

export function parseMany<Val, Err>(values: Val[], parseOne: Mapper<Val, Err[]>, parseAll: Mapper<Val[], Err[]>) {
  return flatten<Err[]>(values.map(parseOne)).concat(parseAll(values))
}
