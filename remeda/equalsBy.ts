import { equals, purry } from 'remeda'
import { Mapper } from '../Mapper'

/**
 * @see isEqualBy
 */

export function equalsBy<In, Out>(a: In, b: In, mapper: Mapper<In, Out>): boolean;

export function equalsBy<In, Out>(mapper: Mapper<In, Out>): (b: In) => (a: In) => boolean;

export function equalsBy() {
  return purry(<In, Out>(a: In, b: In, mapper: Mapper<In, Out>) => equals(mapper(a), mapper(b)), arguments)
}
