import { constant } from 'fast-check'
import { Interval } from 'luxon'
import { todo } from '../../todo'

export function arbitraryInterval() {
  return todo(constant(Interval.fromDateTimes(new Date(0), new Date(0))))
}
