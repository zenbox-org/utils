export interface WithOptionalIdentifiers {
  id?: string
  _id?: string
  uid?: string
  url?: string
  name?: string
  title?: string
}

export function guessObjectIdentifier(object: WithOptionalIdentifiers) {
  return object.id ?? object._id ?? object.uid ?? object.url ?? object.name ?? object.title
}

export function getMoniker(value: unknown) {
  switch (typeof value) {
    case 'object':
      if (value === null) {
        return 'null'
      } else if (Array.isArray(value)) {
        return `array[${value.length}]`
      } else {
        return `object("${guessObjectIdentifier(value)}")`
      }
    case 'boolean':
    case 'number':
    case 'string':
      return `primitive(${value})`
    default:
      return 'value(unknown)'
  }
}
