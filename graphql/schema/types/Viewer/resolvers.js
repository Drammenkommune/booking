import {pg} from '~/db'
import passwordHasher from '~/lib/utils/passwordHasher'
import generateJWT from '~/lib/utils/generateJWT'
import roles from '~/lib/roles'

export const token = async (_, {email, password}) => {
  return pg.connection
    .first('*')
    .from('owners')
    .where({email, deleted: false})
    .then(async user => {
      if (!user) {
        throw new Error('No user')
      }
      const hash = await passwordHasher(password, user.salt)
      if (user.password === hash) {
        return generateJWT(user.id, {...user, role: roles.OWNER})
      } else {
        throw new Error('Wrong password')
      }
    })
}
