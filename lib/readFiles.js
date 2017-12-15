var assert = require('assert')
var path = require('path')

var readFile = require('./readFile')

module.exports = readFiles

async function readFiles (files, pathSite, opts) {
  assert.equal(typeof files, 'object', 'arg1: files must be type object')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var output = await Promise.all(files.map(read))
  output.push(readFile(pathSite, opts))
  return output.filter(function (file) { return file })

  async function read (pathFile) {
    return await readFile(pathFile, options)
  }
}
