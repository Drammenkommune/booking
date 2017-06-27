#!/usr/bin/env node
import Promise from 'bluebird'
import {pg} from '~/db'
import {logger} from '~/lib'
import {createAdmins, createOwners, createUsers} from './lib/seeds'

export default function seed() {
  logger.info('Creating seed data')

  return Promise.all([
    createAdmins(),
    createOwners(),
    createUsers()
  ])
}

if (!module.parent) {
  pg.connect()
  seed().finally(_ => pg.disconnect())
}
