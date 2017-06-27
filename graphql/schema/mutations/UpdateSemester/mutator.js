import moment from 'moment-timezone'
import {pg} from '~/db'
import {roles} from '~/lib'
import {UserFriendlyError} from '~/lib/errors'

export default function({semesterStart, semesterEnd}, {user}) {
  if (user && user.role === roles.ADMIN) {
    const updated = {
      semesterStart: moment(semesterStart, 'DD.MM.YYYY').tz('Europe/Oslo').toDate(),
      semesterEnd: moment(semesterEnd, 'DD.MM.YYYY').tz('Europe/Oslo').toDate(),
    }

    return pg.connection
      .update(updated)
      .from('admins')
      .where({id: user.id})
      .returning('*')
      .then(res => res[0])
  } else {
    throw new UserFriendlyError('Du har ikke tilgang på denne handlingen')
  }
}
