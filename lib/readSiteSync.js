var slash = require('normalize-path')
var assert = require('assert')
var path = require('path')
var glob = require('glob')

var readFilesSync = require('./readFilesSync')

module.exports = readSiteSync

function readSiteSync (pathSite, opts) {
  assert.equal(typeof pathSite, 'string', 'arg1: pathSite must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  // parent
  if (opts.parent === true) opts.parent = pathSite

  // loop through the files
  var files = glob.sync(slash(path.join(pathSite, '/**/*')))
  return readFilesSync(files, pathSite, opts)
}
