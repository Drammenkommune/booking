import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'
import {getBookings} from '~/lib/utils'
import {UserFriendlyError} from '~/lib/errors'
import {roles} from '~/lib'

export default function mutate(input, {user}) {
  if (user.role !== roles.OWNER) {
    throw new UserFriendlyError('Du har ikke tilgang til å utføre denne handlingen')
  }

  const id = fromGlobalId(input.id).id

  return getBookings(id, new Date().getTime())
    .then(bookings => {
      if (bookings.length) {
        throw new UserFriendlyError('Det finnes fremtidige bookinger på lokalet')
      }

      return pg.connection
        .update({deleted: true})
        .from('rooms')
        .where({id, ownerId: user.id})
        .returning('*')
        .then(res => {
          return pg.connection
            .first('*')
            .from('owners')
            .where({id: res[0].ownerId})
            .then(owner => ({owner, deletedRoomId: res[0].id}))
        })
    })
}
