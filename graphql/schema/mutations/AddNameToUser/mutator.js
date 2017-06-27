import jwt from 'jsonwebtoken'
import {pg} from '~/db'
import config from '~/config'

export default ({name, token}) => {
  const {id} = jwt.verify(token, config.jwtSecret)
  return pg.connection
    .update({name})
    .from('users')
    .where({id})
    .returning('*')
    .then(res => res[0])
}
