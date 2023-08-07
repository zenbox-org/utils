import { test } from '@jest/globals'
import { expect } from '../../chai/init'
import { Mapper } from '../../generic/models/Mapper'

export function testEqual<Val, Actual>(getter: () => Val, actual: Actual, mapper?: Mapper<Val, Actual>) {
  test(normalize(getter.name), function () {
    const expected = mapper ? mapper(getter()) : getter()
    expect(actual).to.deep.equal(expected)
  })
}

function normalize(name: string) {
  return name.replace('get_', '')
}
