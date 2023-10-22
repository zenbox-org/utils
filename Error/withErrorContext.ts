import { stringify } from '../JSON'
import { Mapper } from '../Mapper'
import { Modifier } from '../Modifier'
import { Runner } from '../Runner'

export function withErrorContext<Out>(runner: Runner<void, Out>, mutatorOfCaughtValue: Modifier<unknown>) {
  try {
    return runner()
  } catch (e) {
    throw mutatorOfCaughtValue(e)
  }
}

export function ifErrorThenMapElseThrow<T>(mapper: Mapper<Error, T>) {
  return (something: unknown) => {
    throw (something instanceof Error) ? mapper(something) : something
  }
}

export const concatErrorMessage = (suffix: string) => (error: Error) => new Error(error.message + ' ' + suffix)

export const addContextString = (context: unknown) => ifErrorThenMapElseThrow(concatErrorMessage(stringify(context)))
