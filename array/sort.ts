export const asStrings = <T>(getter: (object: T) => string) => (a: T, b: T) => getter(a).localeCompare(getter(b))
