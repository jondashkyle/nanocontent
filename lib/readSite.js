var assert = require('assert')
var path = require('path')
var glob = require('glob')

var readFiles = require('./readFiles')
var readFile = require('./readFile')

module.exports = readSite

async function readSite (pathSite, opts) {
  assert.equal(typeof pathSite, 'string', 'arg1: pathSite must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var files = await glob(path.join(pathSite, '/**/*'))
  return readFiles(files, pathSite, opts)
}
