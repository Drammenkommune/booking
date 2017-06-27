import {pg} from '~/db'
import roles from '~/lib/roles'

export const user = ({userId}) => {
  return pg.connection
    .first('*')
    .from('users')
    .where({id: userId})
}

export const room = ({roomId}) => {
  return pg.connection
    .first('*')
    .from('rooms')
    .where({id: roomId})
}

export const bookingEvents = ({id}, {start, end}) => {
  const query = pg.connection
    .select('*')
    .from('booking_events')
    .where({bookingId: id})

  if (start) { query.where('booking_events.end', '>=', start) }
  if (end) { query.where('booking_events.end', '<=', end) }

  return query
}

export const organization = ({organization, userId}, _, {user}) => {
  return user && user.role === roles.OWNER || user && userId === user.id
    ? organization
    : ''
}

export const activity = ({activity, userId}, _, {user}) => {
  return user && user.role === roles.OWNER || user && userId === user.id
    ? activity
    : ''
}

export const ownerComment = async ({roomId, ownerComment}, _, {user}) => {
  const {ownerId} = await pg.connection.first('ownerId').from('rooms').where({id: roomId})

  return user && user.role === roles.OWNER && ownerId === user.id
    ? ownerComment
    : ''
}
