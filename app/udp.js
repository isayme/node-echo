const dgram = require('dgram')
const config = require('config')
const logger = require('./logger')

const server = dgram.createSocket('udp6')

server.on('error', (err) => {
  logger.error(`udp echo server error: ${err.stack}`)
  throw err
})

server.on('close', () => {
  logger.debug('udp server closed')
})

server.on('message', (msg, rinfo) => {
  logger.info(`new udp connection from ${JSON.stringify(rinfo)}`)
  logger.debug(`udp recv from ${JSON.stringify(rinfo)}: ${msg}`)
  server.send(msg, 0, rinfo.size, rinfo.port, rinfo.address)
})

server.on('listening', () => {
  const address = server.address()
  logger.info(`udp echo listening ${JSON.stringify(address)}`)
})

server.bind(config.port)

module.exports = server
