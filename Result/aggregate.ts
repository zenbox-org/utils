import { failure, success } from './constructors'
import { Result } from './index'

export const aggregate = <In, Err>(results: Result<In, Err>[]) => {
  return results.reduce((final, current) => {
    if (final.success) {
      if (current.success) {
        return success([...final.data, current.data])
      } else {
        return failure(current.error)
      }
    } else {
      return final
    }
  }, success<In[], Err>([]))
}
