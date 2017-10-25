var fs = require('fs')
var lib = require('./lib')

module.exports = {
  readFile: readFile,
  readFileSync: readFileSync,
  readPage: readPage,
  readPageSync: readPageSync,
  readSite: readSite,
  readSiteSync: readSiteSync
}

function readFile (pathFile, opts, callback) {
  opts = opts || { }
  opts.fs = opts.fs || fs
  return lib.readFile(pathFile, opts, callback)
}

function readFileSync (pathFile, opts, callback) {
  opts = opts || { }
  opts.fs = opts.fs || fs
  return lib.readFileSync(pathFile, opts)
}

function readPage (pathPage, opts, callback) {
  opts = opts || { }
  opts.fs = opts.fs || fs
  return lib.readPage(pathPage, opts, callback)
}

function readPageSync (pathPage, opts, callback) {
  opts = opts || { }
  opts.fs = opts.fs || fs
  return lib.readPageSync(pathPage, opts)
}

function readSite (pathSite, opts, callback) {
  opts = opts || { }
  opts.fs = opts.fs || fs
  return lib.readSite(pathSite, opts, callback)
}

function readSiteSync (pathSite, opts, callback) {
  opts = opts || { }
  opts.fs = opts.fs || fs
  return lib.readSiteSync(pathSite, opts)
}