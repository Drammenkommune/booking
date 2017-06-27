import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'
import {roles} from '~/lib'
import {UserFriendlyError} from '~/lib/errors'

export default (input, {user}) => {
  /* eslint-disable no-unused-vars */
  const {ownerId, clientMutationId, ...rest} = input
  const id = fromGlobalId(ownerId).id

  if ((user.role === roles.OWNER && parseInt(user.id, 10) === parseInt(id, 10)) || user.role === roles.ADMIN) {
    return pg.connection
      .update({...rest})
      .from('owners')
      .where({id})
      .returning('*')
      .then(res => res[0])
  } else {
    throw new UserFriendlyError('Du har ikke tilgang på denne handlingen')
  }
}
