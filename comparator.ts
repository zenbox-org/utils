export type Comparator<Val> = (a: Val, b: Val) => OutputComparator

/**
 * If you're not sure, use Comparator instead of ComparatorStrict
 */
export type ComparatorStrict<Val> = (a: Val, b: Val) => OutputComparatorStrict

export type OutputComparator = number

export type OutputComparatorStrict = -1 | 0 | 1

export const ascending = <T>(comparator: Comparator<T>) => comparator

export const descending = <T>(comparator: Comparator<T>) => (a: T, b: T) => -1 * comparator(a, b)
