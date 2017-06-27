/* eslint-disable no-process-env */
const path = require('path')

class Config {
  constructor(env) {
    this.env = env
  }

  get srcDir() { return this.env.SRC_DIR || path.join(__dirname, '../../') }
  get runDir() { return this.env.RUN_DIR || path.join(__dirname, '../../') }
  get graphqlUrl() { return this.env.GRAPHQL_URL }
  get port() { return process.env.PORT }
  get envType() { return process.env.ENV_TYPE || 'production' }
  get path() { return process.env.MOUNT_PATH }
  get publicPath() { return path.resolve(this.runDir, 'server', 'public/') }
  get isDevelopment() { return this.envType !== 'production' }
}


module.exports = new Config(process.env)
