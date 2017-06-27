import express from 'express'
import expressJWT from 'express-jwt'
import graphQLHTTP from 'express-graphql'
import requestLogger from 'morgan'
import Schema from '~/schema/'
import config from '~/config'
import {pg} from '~/db'
import {logger} from '~/lib'
import {isUserRevoked} from '~/lib/utils'
import router from './router'

pg.connect()

const server = express()

server.use(requestLogger(config.isDevelopment ? 'dev' : 'short', {stream: logger.stream}))
server.use('/api', router)

// GraphQL server
server.use('/',
  expressJWT({secret: config.jwtSecret, credentialsRequired: false, isRevoked: isUserRevoked}),
  graphQLHTTP(
    (req) => {
      return ({
        rootValue: {viewer: req.user},
        graphiql:  config.isDevelopment,
        pretty:    config.isDevelopment,
        schema:    Schema,
        formatError: error => {
          if (config.isDevelopment) logger.error(error.stack)
          return {
            message: error.message,
            locations: error.locations,
            type: error.originalError ? error.originalError.name : null,
            status: error.originalError ? error.originalError.status : null
          }
        }
      })
    }
  )
)

export default server
