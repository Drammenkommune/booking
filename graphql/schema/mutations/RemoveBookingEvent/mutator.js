import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'
import {notifyCancellation} from '~/lib/utils'

function updateAndGetBooking(id, remainingEvents) {
  return remainingEvents.length === 1
    ? pg.connection
        .update({recurring: false})
        .from('bookings')
        .returning('*')
        .where({id})

    : pg.connection
        .first('*')
        .from('bookings')
        .where({id})
}

export default async (input) => {
  const id = fromGlobalId(input.id).id
  const {message} = input
  return pg.connection
    .delete()
    .from('booking_events')
    .where({id})
    .returning('*')
    .then(async (res) => {
      const remainingEvents = await pg.connection
        .select('*')
        .from('booking_events')
        .where({bookingId: res[0].bookingId})

      const booking = await updateAndGetBooking(res[0].bookingId, remainingEvents)

      const room = await pg.connection
        .first('*')
        .from('rooms')
        .where({id: booking.roomId || booking[0].roomId})

      const owner = await pg.connection
        .first('*')
        .from('owners')
        .where({id: room.ownerId})

      const user = (booking && booking.userId) || (booking[0] && booking[0].userId)
        ? await pg.connection
          .first('*')
          .from('users')
          .where({id: booking.userId || booking[0].userId})
        : {}

      const result = {
        booking: booking.id ? booking : booking[0],
        deletedBookingEventId: id
      }
      return message && user.id
        ? notifyCancellation(
            message, user, owner, room,
            booking.id ? booking : booking[0], res[0]
          ).then(_ => result)
        : result
    })
}
