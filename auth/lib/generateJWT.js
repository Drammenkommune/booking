import jwt from 'jsonwebtoken'
import config from '~/config'

export default function(id, options) {
  const payload = {id, ...options}
  const token = jwt.sign(payload, config.jwtSecret)
  return token
}
