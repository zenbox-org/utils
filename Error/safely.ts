import { isError } from 'remeda'

export const safelyBy = <Error>(isError: (caught: unknown) => caught is Error) => <Output>(fn: () => Output): Output | Error => {
  try {
    return fn()
  } catch (e) {
    if (isError(e)) {
      return e
    } else {
      throw e
    }
  }
}

export const safely = safelyBy(isError)
