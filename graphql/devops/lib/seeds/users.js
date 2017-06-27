import {pg} from '~/db'
import createUser from '~/lib/utils/createUser'

const users = [
  {
    name: 'Per Nordmann',
    email: 'persepost@nordmann.no',
    phone: '94314410',
    ssn: '26129302275'
  }
]

async function createUserUnlessExists(user) {
  const {name, email, phone, ssn} = user
  return pg.connection
    .raw(`
      INSERT INTO users (name, email, phone, ssn)
      VALUES ('${name}', '${email}', '${phone}', '${ssn}')
      ON CONFLICT DO NOTHING
      RETURNING id
    `)
}

export default function createUsers() {
  return Promise.all(users.map(createUserUnlessExists))
}
