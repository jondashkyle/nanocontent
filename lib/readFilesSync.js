var assert = require('assert')
var path = require('path')

var readFileSync = require('./readFileSync')

module.exports = readFilesSync

function readFilesSync (files, opts, pathSite) {
  assert.equal(typeof files, 'object', 'arg1: files must be type object')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var output = files
    .map(function (pathFile) {
      if (typeof opts.onFile === 'function') opts.onFile(pathFile)
      return readFileSync(pathFile, opts)
    })
    .filter(function (file) { return file })

  output.push(readFileSync(pathSite, opts))

  return output
}
