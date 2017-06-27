const path = require('path')
const fs = require('fs')
const getBabelRelayPlugin = require('babel-relay-plugin')
const schemaPath = './graphql-schema.json'

module.exports = fs.existsSync(path.resolve(__dirname, schemaPath))
  ? getBabelRelayPlugin(require(schemaPath).data)
  : {}
