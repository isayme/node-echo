const tcpServer = require('./app/tcp')
const udpServer = require('./app/udp')

module.exports = {
  tcpServer: tcpServer,
  udpServer: udpServer
}
