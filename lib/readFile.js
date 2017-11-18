var assert = require('assert')
var path = require('path')

var readPage = require('./readPage')
var utilFile = require('../utils/file')

module.exports = readFile

async function readFile (pathFile, opts) {
  assert.equal(typeof pathFile, 'string', 'arg1: pathFile must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  if (!utilFile.isFile(pathFile)) {
    return await readPage(pathFile, opts)
  } else {
    return false
  }
}
