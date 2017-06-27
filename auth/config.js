import fs from 'fs'
import path from 'path'

/* eslint-disable no-magic-numbers */
class Config {
  constructor(env) {
    this.env = env
  }

  get envType() { return this.env.ENV_TYPE }
  get envName() { return this.env.ENV_NAME }

  get isDevelopment() { return this.envType === 'development' }
  get isProduction() { return this.envType === 'production' }
  get isTest() { return this.envType === 'test' }

  get port() { return this.env.PORT }

  get timeZone() { return this.env.TIME_ZONE }

  get publicUrl() { return this.env.DK_PUBLIC_URL }

  get jwtSecret() { return this.env.JWT_SECRET }

  //
  // Postgres config
  //

  // Postgres connection string
  pgDSN(database = this.pgDatabaseName) {
    let credentials = this.env.PG_USER || this.env.USER
    if (this.env.PG_PASS) credentials = credentials.concat(`:${this.env.PG_PASS}`)
    return `postgres://${credentials}@${this.env.PG_HOST || 'localhost'}/${database}`
  }

  get pgDatabaseName() {
    return this.env.PG_DB || `${this.envName}-bookings`
  }

  get pgConfig() {
    return {
      client: 'pg',
      connection: this.pgDSN(),
      pool: { min: 2, max: 10 },
      migrations: {
        directory: `${__dirname}/db/migrations`,
        tableName: 'knex_migrations'
      }
    }
  }

  //
  // Demo
  //

  get demoUserId() { return this.env.DEMO_USER_ID }
  get demoArtifact() { return this.env.DEMO_ARTIFACT }

  //
  // SOAP
  //
  get krrWSDL() { return this.env.KRR_WSDL }
  get personInfoUrl() { return this.env.PERSON_INFO_URL }

  //
  // SAML
  //
  get spEntityId() { return this.env.SP_ENTITY_ID }
  get assertEndpoint() { return this.env.ASSERT_ENDPOINT }
  get ssoLoginUrl() { return this.env.SSO_LOGIN_URL }
  get ssoLogoutUrl() { return this.env.SSO_LOGOUT_URL }
  get idpPersonInfoUrl() { return this.env.IDP_PERSON_INFO_URL }
  get onBehalfOfId() { return this.env.ON_BEHALF_OF_ID }

  //
  // Certificates
  //
  get certPrivate() {
    return fs.readFileSync(path.join(`${__dirname}/certs/private.key`), 'utf-8').toString()
  }

  get certPublic() {
    return fs.readFileSync(path.join(`${__dirname}/certs/public.pem`), 'utf-8').toString()
  }

  get certsIdp() {
    return this.env.IDP_CERT
  }
}

// eslint-disable-next-line no-process-env
export default new Config(process.env)
