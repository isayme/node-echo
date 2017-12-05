const config = require('config')
const winston = require('winston')

const logger = new winston.Logger({
  level: config.logLevel || 'info',
  transports: [new winston.transports.Console()]
})

module.exports = logger
