import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'
import {notifyCancellation} from '~/lib/utils'

export default async (input) => {
  const id = fromGlobalId(input.id).id
  const {message} = input
  const booking = await pg.connection.first('*').from('bookings').where({id})
  const bookingEvent = await pg.connection
    .first('*')
    .from('booking_events')
    .where({bookingId: booking.id})

  return pg.connection
    .delete()
    .from('bookings')
    .where({id})
    .returning('*')
    .then(async (res) => {
      const room = await pg.connection
        .first('*')
        .from('rooms')
        .where({id: res[0].roomId})

      const owner = await pg.connection
        .first('*')
        .from('owners')
        .where({id: room.ownerId})

      const user = res[0].userId
        ? await pg.connection
          .first('*')
          .from('users')
          .where({id: res[0].userId})
        : {}

      const result = {room, owner, user, deletedBookingId: id}
      return message && res[0].userId
        ? notifyCancellation(message, user, owner, room, res[0], bookingEvent)
          .then(_ => result)
        : result
    })
}
