import {pg} from '~/db'
import {roles} from '~/lib'

export default function isUserRevoked(req, payload, done) {
  const viewer = payload
  if (viewer.id && viewer.role === roles.OWNER) {
    return pg.connection
      .first('deleted')
      .from('owners')
      .where({id: viewer.id})
      .then(owner => {
        return done(null, owner.deleted)
      })
  }

  return done(null, false)
}
