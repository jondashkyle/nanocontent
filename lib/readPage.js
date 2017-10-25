var assert = require('assert')
var path = require('path')

module.exports = readPage

function readPage (page, opts, callback) {
  assert.equal(typeof page, 'string', 'arg1: page must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof callback, 'function', 'arg3: callback must be type function')

  callback({ })
}
