export interface Cache<Data> {
  get: (key: string) => Promise<Data | undefined>
  set: (key: string, data: Data) => Promise<void>
}

export type CacheU = Cache<unknown>

/**
 * TODO: Rewrite this function
 */
export async function fetchCachedData<Data>(cache: CacheU, key: string, getData: (cache: CacheU) => Promise<Data>, validateData: (data: Data) => Data) {
  /**
   * Potential bug: validateData may throw if the schema changes while cached data stays in the same format
   * Mitigation: drop the cache if validate throws
   */
  const maybeData = await cache.get(key)
  if (maybeData) {
    return validateData(maybeData as Data /* validation should throw if the type doesn't match */)
  } else {
    const data = await refreshCachedData(cache, key, getData)
    return validateData(data as Data /* validation should throw if the type doesn't match */)
  }
}

export async function refreshCachedData<Data>(cache: Cache<Data>, key: string, getData: (cache: Cache<Data>) => Promise<Data>) {
  const data = await getData(cache)
  await cache.set(key, data)
  return data
}

export function getNoopCache<Data>(): Cache<Data> {
  return {
    get: async (key) => undefined,
    set: async (key, data) => undefined,
  }
}

export const getTestCache = <Data>(): Cache<Data> => ({
  get: async (key) => { throw new Error('Tests must not use cache') },
  set: async (key, data) => { throw new Error('Tests must not use cache') },
})

export const toRefreshedCache = <Data>(cache: Cache<Data>): Cache<Data> => ({
  get: async (key) => undefined, // if get returns undefined, then ensureCachedData will call resetCachedData
  set: cache.set,
})

export const toPartiallyRefreshedCache = <Data>(cache: Cache<Data>, refreshCacheKeyPrefixes: string[]): Cache<Data> => ({
  get: async (key) => {
    if (shouldRefreshCache(key, refreshCacheKeyPrefixes)) {
      return undefined
    } else {
      return cache.get(key)
    }
  },
  set: cache.set,
})

function shouldRefreshCache(key: string, refreshCacheKeyPrefixes: string[]) {
  return refreshCacheKeyPrefixes.find(p => key.startsWith(p))
}

export const toSerializedCache = <InternalData, ExternalData>(serialize: (data: ExternalData) => InternalData, deserialize: (data: InternalData) => ExternalData) => (cache: Cache<InternalData>): Cache<ExternalData> => ({
  get: async (key) => {
    const data = await cache.get(key)
    return data ? deserialize(data) : undefined
  },
  set: async (key, data) => {
    return cache.set(key, serialize(data))
  },
})
