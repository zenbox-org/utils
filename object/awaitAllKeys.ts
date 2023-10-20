/* eslint-disable @typescript-eslint/no-explicit-any */

export async function awaitAllKeysParallel<T>(obj: { [K in keyof T]: Promise<T[K]> }): Promise<T> {
  const keys = Object.keys(obj)
  const values = await Promise.all(Object.values(obj) as Promise<any>[])
  const result: Partial<T> = {}
  keys.forEach((key, i) => {
    result[key as keyof T] = values[i]
  })
  return result as T
}

// export async function awaitAllKeysSequential<T>(obj: { [K in keyof T]: T[K] }): Promise<T> {
//   return Object.entries(obj).reduce((result: Partial<T>, entry) => {
//
//   }, Promise.resolve({}))
// }
