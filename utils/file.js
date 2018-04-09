var objectKeys = require('object-keys')
var assert = require('assert')
var slash = require('normalize-path')
var path = require('path')

module.exports = {
  formatUrl: formatUrl,
  filterFile: filterFile,
  getFileType: getFileType,
  getFileMeta: getFileMeta,
  sortChildren: sortChildren,
  isFile: isFile
}

function sortChildren (result, active) {
  var ext = path.extname(active)
  result = result || { }
  result.files = result.files || [ ]
  result.pages = result.pages || [ ]

  if (ext) result.files.push(active)
  else result.pages.push(active)

  return result
}

function filterFile (file, index) {
  if (file === '.DS_Store') return false
  if (/(^[.#]|(?:__|~)$)/.test(file)) return false
  if (file.indexOf(index) >= 0) return false
  if (file.indexOf('src') >= 0) return false
  return true
}

function getFileType (extension, filetypes) {
  return objectKeys(filetypes)
    .reduce(function (result, value, i, source) {
      if (result) return result

      if (
        filetypes[value] &&
        filetypes[value].indexOf(extension) >= 0
      ) {
        return value
      }

      if (i >= source.length) return 'unknown'
    }, '')
}

function isFile (pathFile) {
  assert.equal(typeof pathFile, 'string', 'enoki: arg1 pathFile must be type string')
  return path.extname(pathFile) !== ''
}

function getFileMeta (opts) {
  assert.equal(typeof opts, 'object', 'enoki: arg1 opts must be type object')
  assert.equal(typeof opts.pathFile, 'string', 'enoki: arg1 opts.pathFile must be type string')
  assert.equal(typeof opts.pathParent, 'string', 'enoki: arg1 opts.pathParent must be type string')
  assert.equal(typeof opts.pathRoot, 'string', 'enoki: arg1 opts.pathRoot must be type string')
  assert.equal(typeof opts.filetypes, 'object', 'enoki: arg1 opts.filetypes must be type string')

  var output = { }
  var ext = path.extname(opts.pathFile)
  output.name = path.basename(opts.pathFile, ext)
  output.path = formatUrl(path.join('/', opts.pathParent, '/', opts.pathFile), opts.pathRoot)
  output.url = formatUrl(path.join('/', opts.pathParent, '/', opts.pathFile), opts.pathRoot, opts.pathSiteParent)
  output.source = opts.pathSource ? (opts.pathSource + output.path) : output.path

  if (ext) {
    output.extension = ext.toLowerCase()
    output.filename = path.basename(opts.pathFile)
    output.type = getFileType(output.extension, opts.filetypes)
  }

  return output
}

function formatUrl (pathFile, pathRoot, pathSiteParent) {
  pathFile = pathFile.replace(pathRoot, '')
  if (pathSiteParent) pathFile = pathFile.replace(pathSiteParent, '')
  pathFile = slash(path.join('/', pathFile))
  return pathFile || '/'
}
