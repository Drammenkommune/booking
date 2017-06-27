import fetch from 'node-fetch'
import moment from 'moment'
import {pg} from '~/db'
import config from '~/config'

const CONTACT_INFO_MAX_AGE_MONTHS = 3

export default function updateUserContactInfo(user) {
  const updatedDate = moment(new Date(user.lastSyncIdPorten))
  if (moment().diff(updatedDate, 'months', true) >= CONTACT_INFO_MAX_AGE_MONTHS) {
    return fetch(`${config.krrUrl}/update?ssn=${user.ssn}`)
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(({phone, email}) => {
        console.log({phone, email})
        return pg.connection
          .update({phone, email, lastSyncIdPorten: new Date()})
          .from('users')
          .where({id: user.id})
          .returning('*')
          .then(res => res[0])
      })
  } else {
    return Promise.resolve(user)
  }
}
