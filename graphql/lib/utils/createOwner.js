import uuid from 'node-uuid'

import {pg} from '~/db'
import {UserFriendlyError} from '~/lib/errors'
import passwordHasher from '~/lib/utils/passwordHasher'


// Creates an owner row in the DB, with a salt and a hashed password
export default async (owner, throwError) => {
  const {email} = owner
  const existingOwner = await pg.connection
     .first('*')
     .from('owners')
     .where({email})
  if (existingOwner && throwError) {
    throw new UserFriendlyError('Brukernavnet er allerede i bruk')
  }
  else if (existingOwner) {
    return existingOwner
  }

  owner.salt = uuid.v4()
  owner.password = await passwordHasher(owner.password, owner.salt)
  return pg.connection
     .insert(owner)
     .into('owners')
     .returning('*')
     .then(res => res[0])
}
