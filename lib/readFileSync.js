var assert = require('assert')

var readPageSync = require('./readPageSync')
var utilFile = require('../utils/file')

module.exports = readFileSync

function readFileSync (pathFile, opts) {
  assert.equal(typeof pathFile, 'string', 'arg1: pathFile must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  if (!utilFile.isFile(pathFile)) {
    return readPageSync(pathFile, opts)
  } else {
    return false
  }
}
