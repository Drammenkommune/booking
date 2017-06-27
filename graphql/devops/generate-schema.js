#!/usr/bin/env node
/* eslint-disable no-process-env,no-magic-numbers */
import fs from 'fs'
import path from 'path'
import {execSync} from 'child_process'
import Schema from '~/schema'
import {graphql} from 'graphql'
import {logger} from '~/lib'
import {pg} from '~/db'
import {introspectionQuery, printSchema} from 'graphql/utilities'

const dir = process.argv[2] || `/app/${process.env.serviceName}/schema`

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(Schema, introspectionQuery)
  .then(result => {
    if (result.errors) {
      logger.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      )
    } else {
      logger.info('Generating GraphQL schema')

      if (!fs.existsSync(dir)) fs.mkdirSync(dir)

      // Generate JSON schema
      fs.writeFileSync(
        path.join(dir, 'schema.json'),
        JSON.stringify(result, null, 2)
      )

      // Save user readable type system shorthand of schema
      fs.writeFileSync(
        path.join(dir, 'schema.graphql'),
        printSchema(Schema)
      )

      // Generate schema.png
      execSync(
        `cat ${dir}/schema.json | graphqlviz | dot -Tpng -o ${dir}/schema.png`
      )
    }
  })
  .catch(logger.error)
  .then(pg.destroy)
