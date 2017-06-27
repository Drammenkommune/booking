import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'
import {roles} from '~/lib'
import {UserFriendlyError} from '~/lib/errors'

export default async function mutate(input, _, {rootValue: { viewer } }) {
  const bookingId = fromGlobalId(input.bookingId).id
  const booking = await pg.connection.first('*').from('bookings').where({id: bookingId})
  const room = await pg.connection.first('ownerId').from('rooms').where({id: booking.roomId})

  if (!viewer || viewer.id !== room.ownerId || viewer.role !== roles.OWNER) {
    throw new UserFriendlyError('Du har ikke tilgang til å utføre denne handlingen')
  }

  return pg.connection
    .update({ownerComment: input.ownerComment})
    .from('bookings')
    .where({id: bookingId})
    .returning('*')
    .then(res => ({booking: res[0]}))
}
