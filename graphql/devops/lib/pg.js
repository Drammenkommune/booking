import Promise from 'bluebird'
import pgDb from 'pg'
import config from '~/config'
import {pg} from '~/db'
import {logger} from '~/lib'
import seed from '../seed'

export default function pgQuery(query) {
  return new Promise((resolve, reject) => {
    const client = new pgDb.Client(config.pgDSN('postgres'))
    client.connect(err => {
      if (err) return reject(err)

      client.query(query, (err) => {
        client.end()
        return err ? reject(err) : resolve(true)
      })
    })
  })
}

async function createTestData() {
  logger.info('Creating testdata')
  const ownerId = await pg.connection.first('id').from('owners').then(res => res.id)

  const room = {
    ownerId,
    name: 'Grieg',
    type: 'classroom',
    info: 'Viktig å hente nøkler før kl 14.00 samme dag.',
    size: 40,
    maxPeople: 10,
    contactName: 'Petter Pettersen',
    contactPhone: '99999999'
  }

  return pg.connection.insert(room).into('rooms')
}

export function setupDB() {
  logger.info(`Creating postgres db ${config.pgDatabaseName}`)

  let dbAlreadyExisted = false

  return pgQuery(`CREATE DATABASE "${config.pgDatabaseName}"`)
    .catch(err => {
      if (err.code === '42P04') {
        logger.warn(`Database "${config.pgDatabaseName}" already exists`)
        dbAlreadyExisted = true
      } else {
        throw err
      }
    })
    .then(_ => {
      logger.info('Migrating database')
      return pg.withConnection(db => db.migrate.latest())
    })
    .then(async () => {
      pg.connect()
      await seed() // Seeds must be idempotent
      if (!dbAlreadyExisted && config.isDevelopment) await createTestData()
      pg.disconnect()
    })
}
