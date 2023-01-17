export function byString<T>(getter: (object: T) => string) {
  return (a: T, b: T) => getter(a).localeCompare(getter(b))
}
