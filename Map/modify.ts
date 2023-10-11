export const modify = <Key, Val>($default: Val, mod: (val: Val) => Val, key: Key, map: Map<Key, Val>) => {
  const value = map.get(key)
  map.set(key, value ? mod(value) : $default)
}

export const increment = <Key>(key: Key, map: Map<Key, number>) => modify(0, val => val + 1, key, map)

export const decrement = <Key>(key: Key, map: Map<Key, number>) => modify(0, val => val - 1, key, map)
