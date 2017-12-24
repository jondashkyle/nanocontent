var xtend = require('xtend')
var fs = require('fs')
var lib = require('./lib')

module.exports = {
  readFile: readFile,
  readFileSync: readFileSync,
  readFiles: readFiles,
  readFilesSync: readFilesSync,
  readPage: readPage,
  readPageSync: readPageSync,
  readSite: readSite,
  readSiteSync: readSiteSync
}

function readFile (pathFile, opts, callback) {
  opts = xtend({ fs: fs }, opts)
  return lib.readFile(pathFile, opts, callback)
}

function readFileSync (pathFile, opts, callback) {
  opts = xtend({ fs: fs }, opts)
  return lib.readFileSync(pathFile, opts)
}

function readFiles (files, pathSite, opts, callback) {
  opts = xtend({ fs: fs }, opts)
  return lib.readFiles(files, pathSite, opts, callback)
}

function readFilesSync (pathFile, opts, callback) {
  opts = xtend({ fs: fs }, opts)
  return lib.readFilesSync(pathFile, opts)
}

function readPage (pathPage, opts, callback) {
  opts = xtend({ fs: fs }, opts)
  return lib.readPage(pathPage, opts, callback)
}

function readPageSync (pathPage, opts, callback) {
  opts = xtend({ fs: fs }, opts)
  return lib.readPageSync(pathPage, opts)
}

function readSite (pathSite, opts, callback) {
  opts = xtend({ fs: fs }, opts)
  return lib.readSite(pathSite, opts, callback)
}

function readSiteSync (pathSite, opts, callback) {
  opts = xtend(opts, { fs: fs })
  return lib.readSiteSync(pathSite, opts)
}
