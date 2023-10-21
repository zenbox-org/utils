import { expect, test } from '@jest/globals'
import { truncate } from './date'
import { day } from './duration'

test(truncate.name, () => {
  expect(truncate(day)(new Date('2022-05-31T12:32:23Z'))).toEqual(new Date('2022-05-31T00:00:00Z'))
})
