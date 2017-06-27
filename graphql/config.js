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

  get timeZone() { return this.env.TIME_ZONE }
  get timeZoneID() { return this.env.TIME_ZONE_ID }

  get graphQLPort() { return this.env.PORT }

  // URLS
  get adminUrl() { return this.env.DK_ADMIN_URL }
  get publicUrl() { return this.env.DK_PUBLIC_URL }
  get authUrl() { return this.env.DK_AUTH_URL }
  get krrUrl() { return this.env.DK_KRR_URL }

  get jwtSecret() { return this.env.JWT_SECRET }


  //
  // AWS config
  //

  // AWS region
  get awsRegion() { return this.env.AWS_REGION }

  // Room images S3 bucket name
  get s3RoomImageBucket() {
    return `${this.envName}-room-images`
  }

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
  // Sendgrid
  //

  get sendgridKey() {
    return this.env.SENDGRID_API_KEY
  }

  get emailRedirect() {
    return this.env.EMAIL_REDIRECT
  }
}

// eslint-disable-next-line no-process-env
export default new Config(process.env)
