import { uniq } from 'remeda'
import { Mapper } from '../Mapper'

export const isUniqBy = <A, B>(getKey: Mapper<A, B>) => (array: A[]) => {
  const keysRaw = array.map(getKey)
  const keysUnique = uniq(keysRaw)
  return keysRaw.length === keysUnique.length
}
