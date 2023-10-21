import { Parser, ParserP } from '../Parser'
import { failure } from '../Result/utils'
import { theUndefinedError, UndefinedError } from '../Error/UndefinedError'
import { mapWrappedError } from '../Result/mapWrappedError'
import { Result } from '../Result'
import { WrappedError } from '../Error/WrappedError'

export const getParserU = <I, O, E>(parse: Parser<I, O, E>) => (input: I | undefined) => {
  if (input === undefined) {
    return {
      success: false,
      error: theUndefinedError,
    }
  } else {
    return mapWrappedError(parse(input))
  }
}

export const getParserUP = <I, O, E>(parse: ParserP<I, O, E>) => async (input: I | undefined): Promise<Result<O, UndefinedError | WrappedError<E>>> => {
  if (input === undefined) {
    return failure(theUndefinedError)
  } else {
    return mapWrappedError(await parse(input))
  }
}
