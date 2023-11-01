import { Evolver } from '../Evolver'
import { Mapper, MapperTwo } from '../Mapper'

export const compareBeforeAfter = <Input, Value, Output>(evolve: Evolver<Input>, map: Mapper<Input, Value>, compare: MapperTwo<Value, Value, Output>) => (inputOld: Input) => {
  const valueOld = map(inputOld)
  const inputNew = evolve(inputOld)
  const valueNew = map(inputNew)
  return compare(valueOld, valueNew)
}
