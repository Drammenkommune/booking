import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'
import {roles} from '~/lib'
import {getBookings} from '~/lib/utils'
import {UserFriendlyError} from '~/lib/errors'

export default async function mutator(input, {user}) {
  if (user.role !== roles.ADMIN) {
    throw new UserFriendlyError('Du har ikke tilgang til å utføre denne handlingen')
  }
  const id = fromGlobalId(input.id).id
  const start = new Date().getTime()
  const bookings = await getBookings(null, start, null, null, id)

  if (bookings.length) {
    throw new UserFriendlyError('Det finnes fremtidige bookinger på lokalet')
  }

  const admin = await pg.connection.first('*').from('admins')
  const deleted = {deleted: true}
  return pg.connection
    .update(deleted)
    .from('owners')
    .where({id})
    .then(_ => {
      return pg.connection
        .update(deleted)
        .from('rooms')
        .where({ownerId: id})
        .then(_ => ({admin, deletedOwnerId: id}))
    })
}
