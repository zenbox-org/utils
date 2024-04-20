export const replaceBy = <T>(isEqual: (a: T, b: T) => boolean) => (item: T) => (items: T[]) => items.map($item => isEqual(item, $item) ? item : $item)
