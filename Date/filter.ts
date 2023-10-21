import { equal } from '../date'

export const byDate = (date: Date) => (object: { date: Date }) => equal(object.date, date)
