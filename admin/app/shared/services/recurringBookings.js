import {formatBookingTime} from '@/services'

const AVAILABLE = 'available'
const NOT_AVAILABE = {
  'busy': 'OPPTATT',
  'closed': 'SKOLEN STENGT'
}

export function getAvailableCount(recurring) {
  return recurring.filter(week => week === AVAILABLE).length
}

export function formatAvailability(week, start, end) {
  if (week === AVAILABLE) {
    return formatBookingTime(start.format('x'), end.format('x'))
  }
  return NOT_AVAILABE[week]
}
