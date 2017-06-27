import {pg} from '~/db'
import moment from 'moment'
import {v4 as uuid} from 'uuid'
import {roles} from '~/lib'
import {getRecurringAvailability, getBookings} from '~/lib/utils'

export const ownerName = ({ownerId}) => {
  return pg.connection
    .first('name')
    .from('owners')
    .where({id: ownerId})
    .then(({name}) => name)
}

export const contactPerson = ({ownerId}) => {
  return pg.connection
    .first('*')
    .from('owners')
    .where({id: ownerId})
    .then(({contactName, contactPhone}) => {
      return {
        id: uuid(),
        name: contactName,
        phoneNumber: contactPhone
      }
    })
}

export const facilities = ({id}) => {
  return pg.connection
    .select('name')
    .from('facilities')
    .where({roomId: id})
    .then(res => {
      return res.map(facility => facility.name)
    })
}

export const unavailableDates = ({ownerId}, {start, end}) => {
  const startDate = moment(start, 'x').subtract(1, 'days')
  const endDate = end ? moment(end, 'x').add(1, 'days') : null

  return pg.connection
    .select('*')
    .from('unavailable_dates')
    .where({ownerId})
    .then(res => res.filter(date => {
      const start = moment(date.startDate, 'DD.MM.YYYY')
      const end = moment(date.endDate || date.startDate, 'DD.MM.YYYY')
      // Check if date ranges overlap
      return endDate
        ? !(end.isSameOrBefore(startDate, 'day') || start.isSameOrAfter(endDate, 'day'))
        : start.isSameOrAfter(startDate, 'day')
    }))
}

export const semesterStart = () => {
  return pg.connection
    .first('semesterStart')
    .from('admins')
    .then(({semesterStart}) => semesterStart)
}

export const semesterEnd = () => {
  return pg.connection
    .first('semesterEnd')
    .from('admins')
    .then(({semesterEnd}) => semesterEnd)
}

export const bookings = ({id}, {start, end, amount}) => {
  return getBookings(id, start, end, amount)
}

export const recurring = async ({id}, {start, end}, {user}) => {
  return getRecurringAvailability(start, end, id, user && user.role === roles.OWNER)
    .then(availabilities => {
      return availabilities.map(status => ({
        id: uuid(),
        status
      }))
    })
}

export const images = ({id}) => {
  return pg.connection
    .select('id', 'url', 'thumbnail')
    .from('images')
    .where({roomId: id})
}

export const owner = ({ownerId}) => {
  return pg.connection
    .first('*')
    .from('owners')
    .where({id: ownerId})
}

export const address = ({ownerId}) => {
  return pg.connection
    .first('*')
    .from('owners')
    .where({id: ownerId})
    .then(({address, postalCode, postalArea}) =>
      (`${address}, ${postalCode} ${postalArea}`)
    )
}
