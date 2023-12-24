import { Mapper } from '../Mapper'
import { Result } from './index'

export const reduceOverMonad = <Data, Error>(mappers: Mapper<Data, Result<Data, Error>>[]) => (result: Result<Data, Error>) => {
  return mappers.reduce((result, mapper) => {
    switch (result.success) {
      case false: return result
      case true: return mapper(result.data)
    }
  }, result)
}
