var assert = require('assert')

var readPageSync = require('./readPageSync')
var utilPage = require('../utils/page')

module.exports = readFileSync

function readFileSync (pathFile, opts) {
  assert.equal(typeof pathFile, 'string', 'arg1: pathFile must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  // pages
  if (utilPage.isPage(pathFile)) return readPageSync(pathFile, opts)

  return false
}
