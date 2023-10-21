import { flatten } from 'lodash-es'
import { MapperErr } from '../../decimaker/models/MapperErr'

export function parseMany<Val, Err>(values: Val[], parseOne: MapperErr<Val, Err>, parseAll: MapperErr<Val[], Err>) {
  return flatten<Err>(values.map(parseOne)).concat(parseAll(values))
}
