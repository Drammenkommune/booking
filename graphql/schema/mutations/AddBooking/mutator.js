import {fromGlobalId} from 'graphql-relay'
import moment from 'moment-timezone'
import {pg} from '~/db'
import {roles} from '~/lib'
import {
  getAvailableEvents, isRoomUnavailable,
  getOverlappingBookings, bookingReceiptMail,
  notifyBooking
} from '~/lib/utils'
import {UserFriendlyError} from '~/lib/errors'

function isConflict(events, roomId) {
  return Promise.all(events.map((ev) => {
    return getOverlappingBookings(roomId, ev.start, ev.end)
      .then(existingEvents => existingEvents.length > 0)
  }))
}

export default async (input, {user}) => {
  const roomId = fromGlobalId(input.roomId).id
  const room = await pg.connection.first('*').from('rooms').where({id: roomId})

  if (room.deleted) {
    throw new UserFriendlyError('Rommet eksisterer ikke lenger')
  }

  const userId = input.userId ? fromGlobalId(input.userId).id : null
  const {events, organization, activity, userComment, recurring} = input
  const isOwner = user && user.id === room.ownerId && user.role === roles.OWNER

  const bookingResult = await pg.connection
   .insert({roomId, userId, organization, activity, recurring, userComment})
   .into('bookings')
   .returning('*')

  const booking = bookingResult[0]
  const constructedEvents = events.map(({start, end}) => ({
    bookingId: booking.id,
    start: moment(start, 'x').tz('Europe/Oslo').format('x'),
    end: moment(end, 'x').tz('Europe/Oslo').format('x'),
  }))

  const bookingEvents = recurring
    ? await getAvailableEvents(constructedEvents, roomId, isOwner)
    : constructedEvents

  const conflicts = await isConflict(bookingEvents, roomId, !!userId)
  const conflict = conflicts.filter(con => con).length > 0
  const notAvailable = await isRoomUnavailable(bookingEvents, roomId, isOwner)

  if (conflict) {
    throw new UserFriendlyError('Bookingen er i konflikt med annen booking, prøv med nytt tidspunkt')
  } else if (notAvailable) {
    throw new UserFriendlyError('Rommet er ikke tilgjengelig i perioden du prøver å booke')
  } else {
    return pg.connection
      .insert(bookingEvents)
      .into('booking_events')
      .returning('*')
      .then(async () => {
        if (userId) {
          const user = await pg.connection.first('*').from('users').where({id: userId})
          return bookingReceiptMail(booking, user, bookingEvents)
            .then(_ => notifyBooking(booking, user, bookingEvents))
            .then(_ => ({room, booking}))
        } else {
          return {room, booking}
        }
      })
  }
}
