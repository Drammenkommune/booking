import moment from 'moment-timezone'
import config from '~/config'
import {pg} from '~/db'
import {getEnumConst} from '~/lib/utils'

async function getEventsByBookings(bookings) {
  return Promise.all(bookings.map(booking => {
    return pg.connection
      .select('*')
      .from('booking_events')
      .where({bookingId: booking.id})
  }))
  .then(values => {
    return values.length
      ? values.reduce((a, b) => a.concat(b))
      : []
  })
}

export async function getBookings(roomId, start, end, amount, ownerId, userId) {
  const query = pg.connection
    .select('bookings.*')
    .from('bookings')
    .leftJoin('booking_events', 'booking_events.bookingId', 'bookings.id')

  if (roomId) {
    query.where('bookings.roomId', roomId)
  }
  if (ownerId) {
    query
      .leftJoin('rooms', 'bookings.roomId', 'rooms.id')
      .where('rooms.ownerId', ownerId)
  }
  if (userId) {
    query.where('bookings.userId', userId)
  }
  if (start) { query.where('booking_events.end', '>=', start) }
  if (end) { query.where('booking_events.end', '<=', end) }
  if (amount) { query.limit(amount) }

  return query.groupBy('bookings.id')
}

export async function getOverlappingBookings(roomId, start, end) {
  return pg.connection
    .select('bookings.*')
    .from('bookings')
    .leftJoin('booking_events', 'booking_events.bookingId', 'bookings.id')
    .whereNot('booking_events.start', '>=', end)
    .whereNot('booking_events.end', '<=', start)
    .where('bookings.roomId', roomId)
    .groupBy('bookings.id')
}

// Accepts array of booking events and room id
export async function isRoomUnavailable(events, id, isOwner) {
  const room = await pg.connection.first('*').from('rooms').where({id})
  const owner = await pg.connection.first('*').from('owners').where({id: room.ownerId})

  const unavailableDates = isOwner
    ? []
    : await pg.connection.select('*').from('unavailable_dates').where({ownerId: owner.id})

  const conflicts = events.filter(({start}) => {
    const momentStart = moment(start, 'x').tz('Europe/Oslo')
    return unavailableDates.findIndex(({startDate, endDate}) => {
      if (endDate) {
        return momentStart.isSameOrAfter(moment(startDate, 'DD.MM.YYYY'), 'day')
          && momentStart.isSameOrBefore(moment(endDate, 'DD.MM.YYYY'), 'day')
      } else {
        return momentStart.isSame(moment(startDate, 'DD.MM.YYYY'), 'day')
      }
    }) >= 0
  })

  return conflicts.length > 0
}

// Accepts array of booking events and room id
// returns array of available events
export async function getAvailableEvents(events, id, isOwner) {
  const room = await pg.connection.first('*').from('rooms').where({id})
  const owner = await pg.connection.first('*').from('owners').where({id: room.ownerId})
  const admin = await pg.connection.first('*').from('admins')

  const unavailableDates = isOwner
    ? []
    : await pg.connection.select('*').from('unavailable_dates').where({ownerId: owner.id})

  const enrichedEvents = await Promise.all(events.map(async (event) => {
    const momentStart = moment(event.start, 'x').tz('Europe/Oslo')
    const available = unavailableDates.findIndex(({startDate, endDate}) => {
      if (endDate) {
        return momentStart.isSameOrAfter(moment(startDate, 'DD.MM.YYYY'), 'day')
          && momentStart.isSameOrBefore(moment(endDate, 'DD.MM.YYYY'), 'day')
      } else {
        return momentStart.isSame(moment(startDate, 'DD.MM.YYYY'), 'day')
      }
    }) === -1
    && momentStart.isBefore(moment(admin.semesterEnd), 'day')

    const conflicts = await getOverlappingBookings(id, event.start, event.end)

    return {...event, available, conflicted: conflicts.length > 0}
  }))

  return enrichedEvents
    .filter(event => event.available && !event.conflicted)
    .map(({available: _, conflicted: omit, ...event}) => event) // eslint-disable-line no-unused-vars
}

// Accepts two integer values for unix time (start and end) and an id for a room
// Return an array of strings representing availability for each week until semester end
export async function getRecurringAvailability(start, end, id, isOwner) {
  const room = await pg.connection.first('*').from('rooms').where({id})
  const owner = await pg.connection.first('*').from('owners').where({id: room.ownerId})
  const admin = await pg.connection.first('*').from('admins')

  const booking = {
    start: moment(start, 'x').tz(config.timeZoneID).add(1, 'milliseconds'),
    end: moment(end, 'x').tz(config.timeZoneID)
  }

  const unavailableDates = isOwner
    ? []
    : await pg.connection.select('*').from('unavailable_dates').where({ownerId: owner.id})

  const weekCount = Math.ceil(moment(admin.semesterEnd).diff(booking.start, 'weeks', true))
  const weeks = [booking]
  for (let i = 1; i <= weekCount; i++) {
    const newWeek = {
      start: booking.start.clone().add(i, 'weeks'),
      end: booking.end.clone().add(i, 'weeks'),
    }
    weeks.push(newWeek)
  }

  const roomBookings = await getBookings(
    id,
    booking.start.clone().hour(0).format('x'),
    moment(admin.semesterEnd).format('x')
  )

  const events = await getEventsByBookings(roomBookings)

  return weeks.map(weekBooking => {
    const unavailable = unavailableDates.filter(({startDate, endDate}) => {
      const momentStart = weekBooking.start
      if (endDate) {
        return momentStart.isSameOrAfter(moment(startDate, 'DD.MM.YYYY'), 'day')
          && momentStart.isSameOrBefore(moment(endDate, 'DD.MM.YYYY'), 'day')
      } else {
        return momentStart.isSame(moment(startDate, 'DD.MM.YYYY'), 'day')
      }
    }).length > 0

    if (unavailable || weekBooking.start.isAfter(moment(admin.semesterEnd))) {
      return getEnumConst('AvailabilityType', 'closed')
    }
    const matches = events.filter(ev => {
      const start = moment(ev.start, 'x')
      const end = moment(ev.end, 'x')

      const startBefore = start.isSameOrBefore(weekBooking.start)
      const startDuring = start.isSameOrAfter(weekBooking.start)
        && start.isBefore(weekBooking.end)

      const endDuring = end.isSameOrBefore(weekBooking.end)
        && end.isAfter(weekBooking.start)
      const endAfter = end.isSameOrAfter(weekBooking.end)

      return (startBefore && (endDuring || endAfter))
        || (startDuring && (endDuring || endAfter))
    })
    return matches.length
      ? getEnumConst('AvailabilityType', 'busy')
      : getEnumConst('AvailabilityType', 'available')
  })
}
