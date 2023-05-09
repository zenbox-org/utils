export function duration(count: number, unit: string) {
  switch (unit) {
    case 'w':
    case 'week':
    case 'weeks':
      return count * weeks
    case 'd':
    case 'day':
    case 'days':
      return count * days
    case 'h':
    case 'hr':
    case 'hrs':
    case 'hour':
    case 'hours':
      return count * hours
    case 'm':
    case 'min':
    case 'mins':
    case 'minute':
    case 'minutes':
      return count * minutes
    case 's':
    case 'sec':
    case 'second':
    case 'seconds':
      return count * seconds
    case 'ms':
    case 'msec':
    case 'millisecond':
    case 'milliseconds':
      return count * milliseconds
    default:
      throw new Error(`Unknown unit: ${unit}`)
  }
}

export const milliseconds = 1

export const seconds = 1000 * milliseconds

export const minutes = 60 * seconds

export const hours = 60 * minutes

export const days = 24 * hours

export const weeks = 7 * days

export const months = 30 * days // nominal, not calendar

export const years = 12 * months

// naming sugar
export const millisecond = milliseconds

export const second = seconds

export const minute = minutes

export const hour = hours

export const day = days

export const week = weeks

export const month = months

export const year = years
