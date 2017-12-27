var assert = require('assert')

var readFileSync = require('./readFileSync')
var defaults = require('./defaults')

module.exports = readFilesSync

function readFilesSync (files, pathSite, opts) {
  assert.equal(typeof files, 'object', 'arg1: files must be type object')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var output = {
    '/': readFileSync(pathSite, opts)
  }

  files.forEach(function (pathFile) {
    if (typeof opts.onFile === 'function') opts.onFile(pathFile)
    var content = readFileSync(pathFile, opts)
    if (content && !content.name.match(defaults.ignore)) {
      output[content.url] = content
    }
  })

  return output
}
