export function pass<T>(fn: (input: T) => void) {
  return function (input: T) {
    fn(input)
    return input
  }
}

export function passLog<T, Args extends unknown[]>(...args: Args) {
  return function (input: T) {
    // eslint-disable-next-line no-console
    console.log(...args)
    return input
  }
}
