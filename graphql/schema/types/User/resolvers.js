import {pg} from '~/db'
import {v4 as uuid} from 'uuid'
import {getBookings} from '~/lib/utils'

export const bookings = ({id}, {start, end, amount}) => {
  return getBookings(null, start, end, amount, null, id)
}

export const previousRooms = ({id}) => {
  if (!id) { return [] }

  return pg.connection
    .select('rooms.*')
    .from('rooms')
    .innerJoin('bookings', 'bookings.roomId', 'rooms.id')
    .where('bookings.userId', id)
    .where('rooms.deleted', false)
    .groupBy('rooms.id')
    .orderByRaw('count(*) desc')
}

export const aboutService = () => {
  return pg.connection.first('aboutService').from('admins').then(({aboutService}) => aboutService)
}

export const termsAndAgreement = () => {
  return pg.connection.first('termsAndAgreement').from('admins').then(({termsAndAgreement}) => termsAndAgreement)
}

export const pdfFile = () => {
  return pg.connection
    .first('pdfDownloadUrl', 'pdfFileName')
    .from('admins')
    .then(({pdfDownloadUrl, pdfFileName}) => {
      return pdfDownloadUrl && pdfFileName
        ? {
          id: uuid(),
          downloadUrl: pdfDownloadUrl,
          name: pdfFileName
        }
        : null
    })
}
