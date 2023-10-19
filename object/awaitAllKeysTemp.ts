export const awaitAllKeys = async <T extends object>(promises: T) => {
  const result = {} as {
    [P in keyof T]: Awaited<T[P]>
  }
  for (const [key, promise] of Object.entries(promises)) {
    result[key as keyof T] = await promise
  }
  return result
}

// async function awaitAllObjectValues<T extends object>(obj: T): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
//   const keys = Object.keys(obj) as (keyof T)[]
//   const values = await Promise.all(keys.map(key => ({ key, value: obj[key] })))
//
//   return keys.reduce((acc, key, index) => {
//     acc[key] = values[index]
//     return acc
//   }, {} as object)
// }
