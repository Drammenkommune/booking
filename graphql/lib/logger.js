import winston from 'winston'
import config from '~/config'

const logger = new winston.Logger({
  level: config.logLevel,
  transports: [
    new winston.transports.Console({colorize: config.isDevelopment})
  ]
})

logger.stream = {
  write: (message) => logger.info(message.trim())
}

export default logger
