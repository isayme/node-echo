const net = require('net')
const config = require('config')
const logger = require('./logger')

const server = net.createServer({})

server.on('error', (err) => {
  logger.error(err)
  throw err
})

server.listen(config.port, () => {
  const address = server.address()
  logger.info(`tcp echo listening ${JSON.stringify(address)}`)
})

server.on('connection', (sock) => {
  const address = sock.address()
  logger.debug(`new tcp connection from ${JSON.stringify(address)}`)

  sock.setTimeout(5000)
  sock.setNoDelay(true)

  sock.on('error', (err) => {
    logger.error(err)
  })
  sock.on('close', () => {
    logger.debug('tcp client close')
    sock.destroy()
  })
  sock.on('timeout', () => {
    logger.debug('tcp connection timeout, close it')
    sock.end()
  })

  sock.on('end', () => {
    logger.debug('tcp client closed')
    // sock.destroy()
  })

  sock.on('data', (data) => {
    logger.verbose(`tcp recv from ${JSON.stringify(address)}: ${data}`)
    sock.write(data)
  })
})

module.exports = server
