var assert = require('assert')
var path = require('path')
var glob = require('glob')

var readFile = require('./readFile')

module.exports = readSite

async function readSite (pathSite, opts) {
  assert.equal(typeof pathSite, 'string', 'arg1: pathSite must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var files = await glob(path.join(pathSite, '/**/*'))

  var output = files
    .map(async function (pathFile) {
      if (typeof opts.onFile === 'function') opts.onFile(pathFile)
      return await readFile(pathFile, opts)
    })
    .filter(function (file) { return file })

  output.push(readFile(pathSite, opts))

  return output
}
