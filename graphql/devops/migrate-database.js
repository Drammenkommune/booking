#!/usr/bin/env node
import {pg} from '~/db'
import logger from '~/lib/logger'

logger.info('Migrating database')

pg.withConnection(db => {
  return process.argv[2] === 'rollback' ? db.migrate.rollback() : db.migrate.latest()
})
