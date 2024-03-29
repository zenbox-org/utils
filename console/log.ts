/* eslint-disable no-console */

export const logDeep = <T>(value: T) => {
  console.dir(value, { depth: null })
  return value
}
