import knex from 'knex'
import config from '~/config'

export default {
  connect() { this.connection = this.createConnection() },

  disconnect() { return this.connection && this.connection.destroy() },

  createConnection() {
    return knex(config.pgConfig)
  },

  withConnection(fn) {
    const connection = this.createConnection()
    return fn(connection).then(
      _ => connection.destroy()
    ).catch(
      _ => connection.destroy()
    )
  }
}
