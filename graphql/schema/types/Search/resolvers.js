import {pg} from '~/db'
import {fromGlobalId} from 'graphql-relay'

export const rooms = (_, args) => {
  const query = pg.connection
    .select('*')
    .from('rooms')
    .where({deleted: false})

  if (args.ownerId && args.ownerId !== 'null') {
    const ownerId = fromGlobalId(args.ownerId).id
    query.where({ownerId})
  }

  if (args.roomType && args.roomType !== 'null') {
    query.where({type: args.roomType})
  }

  return query
}

export const owners = () => {
  return pg.connection
    .select('*')
    .from('owners')
    .where({deleted: false})
}

export const room = (_, {roomId}) => {
  const id = fromGlobalId(roomId).id
  return pg.connection
    .first('*')
    .from('rooms')
    .where({id, deleted: false})
}
