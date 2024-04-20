import { Result } from '../Result'
import { failure } from '../Result/constructors'

export interface OverflowError<Val> {
  type: 'OverflowError'
  left: Val
  right: Val
}

export const overflow = <Data, Val>(left: Val, right: Val): Result<Data, OverflowError<Val>> => failure({ type: 'OverflowError', left, right })
