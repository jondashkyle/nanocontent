var assert = require('assert')
var path = require('path')

module.exports = readFile

function readFile (pathFile, opts, callback) {
  assert.equal(typeof pathFile, 'string', 'arg1: pathFile must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof callback, 'function', 'arg3: callback must be type function')

  callback({ })
}
