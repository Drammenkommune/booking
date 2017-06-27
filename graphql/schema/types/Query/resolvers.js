import {fromGlobalId} from 'graphql-relay'
import {pg} from '~/db'
import {UserFriendlyError, NotFoundError} from '~/lib/errors'
import roles from '~/lib/roles'

const getLoggedInUser = (id, table, error = true) => {
  if (!id && error) {
    throw new UserFriendlyError('Du har ikke tilgang')
  } else if (!id) {
    return Promise.resolve({})
  }

  return pg.connection
    .first('*')
    .from(table)
    .where({id})
}

export const admin = ({viewer}) => {
  return getLoggedInUser(viewer ? viewer.id : null, 'admins', false)
}

export const owner = ({viewer}) => {
  return getLoggedInUser(viewer ? viewer.id : null, 'owners')
}

export const user = ({viewer}) => {
  return getLoggedInUser(viewer ? viewer.id : null, 'users', false)
}

export function node({viewer}, {id}) {
  const {type, id: typeSpecificId} = fromGlobalId(id)
  const wrapWithTypeInfo = (promise) => {
    return promise.then(result => {
      if (result) {
        result.__typename = type
        return result
      } else {
        throw new NotFoundError('Not found')
      }
    })
  }

  const findOwner = () => {
    const query = pg.connection.first('*').from('owners')
    if (viewer.role === roles.OWNER) {
      query.where({email: viewer.email})
    } else if (viewer.role === roles.ADMIN) {
      query.where({id: typeSpecificId})
    }

    return query
  }

  const authenticatedRoom = (id) => {
    const query = pg.connection.first('*').from('rooms').where({id})
    if (viewer && viewer.role === roles.OWNER) {
      query.where({ownerId: viewer.id})
    }

    return query
  }

  const authenticatedBooking = (id) => {
    if (viewer && viewer.role === roles.OWNER) {
      return pg.connection
        .first('bookings.*')
        .from('bookings')
        .leftJoin('rooms', 'rooms.id', 'bookings.roomId')
        .where('rooms.ownerId', viewer.id)
        .where('bookings.id', id)
    } else {
      return pg.connection
        .first('*')
        .from('bookings')
        .where({id, userId: viewer ? viewer.id : null})
    }
  }

  switch (type) {
    case 'Viewer': return wrapWithTypeInfo(Promise.resolve({}))
    case 'Owner': return wrapWithTypeInfo(findOwner())
    case 'User': return wrapWithTypeInfo(user(viewer))
    case 'Room': return wrapWithTypeInfo(
      authenticatedRoom(typeSpecificId)
    )
    case 'Booking': return wrapWithTypeInfo(
      authenticatedBooking(typeSpecificId)
    )

    default: {
      throw new Error(`Unknown type ${type}`)
    }
  }
}
