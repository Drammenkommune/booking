import {v4 as uuid} from 'uuid'
import {pg} from '~/db'
import {getBookings, s3Signer} from '~/lib/utils'
import {roles} from '~/lib'

export const unavailableDates = ({id}) => {
  return pg.connection
    .select('*')
    .from('unavailable_dates')
    .where({ownerId: id})
}

export const rooms = ({id}) => {
  return pg.connection
    .select('*')
    .from('rooms')
    .where({ownerId: id, deleted: false})
}

export const bookings = ({id}, {start, end, amount}) => {
  return getBookings(null, start, end, amount, id)
}

export const uploadUrl = (room, {filename, filetype}) => {
  return s3Signer(room.id, filename, filetype)
}

export const email = ({id, email}, _, {user}) => {
  const isOwner = user.role === roles.OWNER && user.id === id
  const isAdmin = user.role === roles.ADMIN

  return isOwner || isAdmin ? email : null
}

export const contactPerson = ({contactName, contactPhone}) => ({
  id: uuid(),
  name: contactName,
  phoneNumber: contactPhone
})

export const termsAndAgreement = () => {
  return pg.connection.first('termsAndAgreement').from('admins').then(({termsAndAgreement}) => termsAndAgreement)
}
