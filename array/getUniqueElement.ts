import { equals } from 'remeda'

export function getUniqueElement<T>(elements: T[]) {
  const first = elements[0]
  const everyElementIsSame = elements.every(equals(first))
  if (everyElementIsSame) {
    return first
  } else {
    throw new Error('Some elements are different')
  }
}
