import createOwner from '~/lib/utils/createOwner'
import {UserFriendlyError} from '~/lib/errors'
import {roles} from '~/lib'

export default function(owner, {user}) {
  if (user.role !== roles.ADMIN) {
    throw new UserFriendlyError('Du har ikke tilgang til denne handlingen')
  }

  /* eslint-disable no-unused-vars */
  const {clientMutationId, ...rest} = owner
  return createOwner({
    ...rest,
  }, true)
}
