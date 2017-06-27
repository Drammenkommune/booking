import {createServer} from 'http'
import app from './app'
import config from '~/config'
import {logger} from '~/lib'

createServer(app).listen(config.graphQLPort, () => logger.info(
  `GraphQL Server is now listening on ${config.graphQLPort}`
))
