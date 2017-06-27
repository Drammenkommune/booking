export class UserFriendlyError extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'UserFriendlyError'
    this.message = message
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'NotFoundError'
    this.message = message
    this.status = 404
  }
}
