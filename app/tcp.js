const net = require('net')
const config = require('config')
const logger = require('./logger')

const server = net.createServer({
  allowHalfOpen: false
})

server.on('error', err => {
  logger.error(err)
  throw err
})

server.listen(config.port, () => {
  const address = server.address()
  logger.info(`tcp echo listening ${JSON.stringify(address)}`)
})

server.on('connection', sock => {
  const address = {
    address: sock.remoteAddress,
    port: sock.remotePort,
    family: sock.remoteFamily
  }

  logger.info(`new tcp connection from ${JSON.stringify(address)}`)

  sock.setTimeout(5000)
  sock.setNoDelay(true)

  sock.on('error', err => {
    logger.error(err)
  })

  sock.on('end', () => {
    logger.debug('tcp connection client closed')
  })

  sock.on('close', () => {
    logger.debug('tcp connection closed')
  })

  sock.on('timeout', () => {
    logger.debug('tcp connection timeout, close it')
    sock.end()
  })

  sock.on('data', data => {
    logger.debug(`tcp recv from ${JSON.stringify(address)}: ${data}`)
    sock.write(data)
  })
})

module.exports = server
