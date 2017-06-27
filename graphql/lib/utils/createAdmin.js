import uuid from 'node-uuid'

import {pg} from '~/db'
import passwordHasher from '~/lib/utils/passwordHasher'


// Creates an admin row in the DB, with a salt and a hashed password
export default async (admin) => {
  const {email} = admin
  const existingAdmin = await pg.connection
     .first('*')
     .from('admins')
     .where({email})
  if (existingAdmin) {
    return existingAdmin
  }

  admin.salt = uuid.v4()
  admin.password = await passwordHasher(admin.password, admin.salt)
  return pg.connection
     .insert(admin)
     .into('admins')
     .returning('*')
}
