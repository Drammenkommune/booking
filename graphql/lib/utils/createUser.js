import {pg} from '~/db'


// Creates an user row in the DB
export default async (user) => {
  const {email, phone} = user
  const existingOwner = await pg.connection
     .first('*')
     .from('users')
     .where({email, phone})

  if (existingOwner) {
    return existingOwner
  }

  return pg.connection
   .insert(user)
   .into('users')
   .returning('*')
}
