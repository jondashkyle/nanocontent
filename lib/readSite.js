var assert = require('assert')
var path = require('path')

module.exports = readSite

function readSite (site, opts, callback) {
  assert.equal(typeof site, 'string', 'arg1: site must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof callback, 'function', 'arg3: callback must be type function')
}
