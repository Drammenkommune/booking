import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'
import {roles} from '~/lib'
import {UserFriendlyError} from '~/lib/errors'

export default function mutator({adminId, aboutService}, {user}) {
  if (user.role !== roles.ADMIN) {
    throw new UserFriendlyError('Du har ikke tilgang på denne handlingen')
  }

  const id = fromGlobalId(adminId).id

  return pg.connection
    .update({aboutService})
    .from('admins')
    .where({id})
    .returning('*')
    .then(res => res[0])
}
