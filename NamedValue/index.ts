import { Mapper, MapperTwo } from '../Mapper'

export interface ValueWithName<V> {
  value: V
  name: string
}

export const vn = <T>(value: T, name: string) => ({ value, name })
type Fun<Fun, Args> = ValueWithName<{ fun: Fun, args: Args }>
type Fun1<In, Out> = Fun<Mapper<In, Out>, [In]>
type Fun2<In1, In2, Out> = Fun<MapperTwo<In1, In2, Out>, [In1, In2]>
