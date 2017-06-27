import moment from 'moment-timezone'
import {fromGlobalId} from 'graphql-relay'
import config from '~/config'
import {pg} from '~/db'
import uuid from 'uuid'

function formatCalendar(cal, ev) {
  let calendarString = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\n'
  calendarString = calendarString.concat(`X-WR-TIMEZONE:${config.timeZoneID}\r\n`)
  calendarString = calendarString.concat(`PRODID:${cal.PRODID}\r\n`)
  calendarString = calendarString.concat(`BEGIN:VEVENT\r\n`)
  calendarString = calendarString.concat(`UID:${ev.UID}\r\n`)
  calendarString = calendarString.concat(`DTSTAMP:${ev.DTSTAMP}\r\n`)
  calendarString = calendarString.concat(`DTSTART:${ev.DTSTART}\r\n`)
  calendarString = calendarString.concat(`DTEND:${ev.DTEND}\r\n`)
  calendarString = calendarString.concat(`DESCRIPTION:${ev.DESCRIPTION}\r\n`)
  calendarString = calendarString.concat(`LOCATION:${ev.LOCATION}\r\n`)
  calendarString = calendarString.concat(`SUMMARY:${ev.SUMMARY}\r\n`)
  calendarString = calendarString.concat('SEQUENCE:0\r\n')
  if (ev.RRULE) calendarString = calendarString.concat(`RRULE:${ev.RRULE}\r\n`)
  if (ev.EXDATE) calendarString = calendarString.concat(`EXDATE:${ev.EXDATE}\r\n`)
  calendarString = calendarString.concat('END:VEVENT\r\nEND:VCALENDAR')

  return calendarString
}

function formatCalendarMultipleEvents(cal, events) {
  let calendarString = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\n'
  calendarString = calendarString.concat(`X-WR-TIMEZONE:${config.timeZoneID}\r\n`)
  calendarString = calendarString.concat(`PRODID:${cal.PRODID}\r\n`)
  events.forEach(ev => {
    calendarString = calendarString.concat(`BEGIN:VEVENT\r\n`)
    calendarString = calendarString.concat(`UID:${ev.UID}\r\n`)
    calendarString = calendarString.concat(`DTSTAMP:${ev.DTSTAMP}\r\n`)
    calendarString = calendarString.concat(`DTSTART:${ev.DTSTART}\r\n`)
    calendarString = calendarString.concat(`DTEND:${ev.DTEND}\r\n`)
    calendarString = calendarString.concat(`DESCRIPTION:${ev.DESCRIPTION}\r\n`)
    calendarString = calendarString.concat(`LOCATION:${ev.LOCATION}\r\n`)
    calendarString = calendarString.concat(`SUMMARY:${ev.SUMMARY}\r\n`)
    calendarString = calendarString.concat('SEQUENCE:0\r\n')
    calendarString = calendarString.concat('END:VEVENT\r\n')
  })
  calendarString = calendarString.concat('END:VCALENDAR')
  return calendarString
}

function formatTimeStamps(date, zone) {
  return zone
    ? moment(date).tz(config.timeZoneID).format('YYYYMMDD[T]HHmmss[Z]')
    : moment(date).tz(config.timeZoneID).format('YYYYMMDD[T]HHmmss')
}

function createCalEvent(ev, room, owner, booking) {
  const timeStamp = formatTimeStamps(new Date(), true)
  const start = formatTimeStamps(new Date(parseInt(ev.start, 10)))
  const end = formatTimeStamps(new Date(parseInt(ev.end, 10)))

  return {
    UID: uuid.v4(),
    DTSTAMP: timeStamp,
    DTSTART: start,
    DTEND: end,
    DESCRIPTION: (room.info || '').replace(/([\,;])/g, ''),
    LOCATION: `${owner.street}\\, ${owner.postalCode} ${owner.postalArea}`,
    SUMMARY: `${room.name.replace(/([\,;])/g, '')} - ${(booking.organization || '').replace(/([\,;])/g, '')}`,
  }
}

export default async (bookingId) => {
  const id = fromGlobalId(bookingId).id
  const booking = await pg.connection.first('*').from('bookings').where({id})
  const events = await pg.connection.select('*').from('booking_events').where({bookingId: booking.id})
  const room = await pg.connection.first('*').from('rooms').where({id: booking.roomId})
  const owner = await pg.connection.first('*').from('owners').where({id: room.ownerId})

  const calendar = {
    VERSION: '2.0',
    PRODID: '-//Drammen//NONSGML Booking//EN'
  }

  const calEvent = createCalEvent(events[0], room, owner, booking)
  const calEvents = []
  if (booking.recurring && events.length > 1) {
    const lastEvent = events[events.length - 1]
    const until = formatTimeStamps(new Date(parseInt(lastEvent.start, 10)), true)
    const exceptions = []
    events.reduce((prev, cur) => {
      const WEEK_MS = 604800000
      let weekDiff = parseInt(cur.start, 10) - parseInt(prev.start, 10)
      while (weekDiff > WEEK_MS) {
        weekDiff -= WEEK_MS
        exceptions.push(formatTimeStamps(new Date(parseInt(prev.start, 10) + weekDiff)))
      }

      return cur
    })
    calEvent.RRULE = `FREQ=WEEKLY;UNTIL=${until}`
    calEvent.EXDATE = `${exceptions.join(',')}`
  } else if (events.length > 1 && !booking.recurring) {
    events.forEach(ev => {
      calEvents.push(createCalEvent(ev, room, owner, booking))
    })
  }
  const name = unescape(encodeURIComponent(`${room.name} - ${booking.organization}.ics`))
  return {
    data: new Buffer(events.length === 1 || booking.recurring
      ? formatCalendar(calendar, calEvent)
      : formatCalendarMultipleEvents(calendar, calEvents)
    ),
    name
  }
}
