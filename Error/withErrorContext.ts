import { Mapper } from '../../generic/models/Mapper'
import { Modifier } from '../../generic/models/Modifier'
import { Runner } from '../../generic/models/Runner'
import { stringify } from '../JSON'

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
