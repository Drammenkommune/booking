#!/usr/bin/env node
import {logger} from '~/lib'
import config from '~/config'
import pgQuery from './lib/pg'

logger.info(`Dropping postgres database: ${config.pgDatabaseName}`)
pgQuery(`DROP DATABASE "${config.pgDatabaseName}"`).catch(err => logger.error(err.message))
