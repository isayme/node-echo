const config = require('config')
const assert = require('power-assert')
const { exec } = require('./utils')

describe('TCP', () => {
  it('should ok with ipv4', function * () {
    let expect = 'hello, 世界'
    let result = yield exec(`echo -n "${expect}" | nc -4 -w1 localhost ${config.port}`)
    assert.equal(result, expect)
  })

  it('should ok with ipv6', function * () {
    let expect = 'hello, 世界'
    let result = yield exec(`echo -n "${expect}" | nc -6 -w1 localhost ${config.port}`)
    assert.equal(result, expect)
  })
})
