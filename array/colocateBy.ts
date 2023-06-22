import { groupBy, sortBy } from 'remeda'

export function colocateBy<T>(items: T[], fn: (item: T) => PropertyKey) {
  const itemsGrouped = groupBy(items, fn)
  const itemsSorted = sortBy(Object.entries(itemsGrouped), (entry) => entry[0])
  return itemsSorted.flatMap(entry => entry[1])
}
