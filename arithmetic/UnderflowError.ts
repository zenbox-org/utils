import { Result } from '../Result'
import { failure } from '../Result/constructors'

export interface UnderflowError<Val> {
  type: 'UnderflowError'
  left: Val
  right: Val
}

export const underflow = <Data, Val>(left: Val, right: Val): Result<Data, UnderflowError<Val>> => failure({ type: 'UnderflowError', left, right })
