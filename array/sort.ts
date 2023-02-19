export const asStrings = <T>(getter: (object: T) => string) => (a: T, b: T) => getter(a).localeCompare(getter(b))

export const ofNumbers = (a: number, b: number) => (a < b) ? -1 : ((a > b) ? 1 : 0)
