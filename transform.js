var staticModule = require('static-module')
var through = require('through2')
var path = require('path')

var nanocontent = require('.')

module.exports = transform

function transform (filename) {
  if (/\.json$/.test(filename)) return through()

  var vars = {
    __filename: filename,
    __dirname: path.dirname(filename)
  }

  var sm = staticModule({
    nanocontent: {
      readPageSync: function (pathPage, opts) {
        opts = opts || { }
        opts.pathRoot = opts.pathRoot || vars.__dirname
        opts.parent = typeof opts.parent !== 'undefined' ? opts.parent : true

        var pathDir = path.isAbsolute(pathPage) ? pathPage : path.join(vars.__dirname, pathPage)
        var pageSync = nanocontent.readPageSync(pathDir, opts)

        var stream = through()
        stream.push(JSON.stringify(pageSync, { }, 2))
        stream.push(null)
        return stream
      },
      readSiteSync: function readDir (pathSite, opts) {
        opts = opts || { }
        opts.pathRoot = opts.pathRoot || vars.__dirname
        opts.parent = typeof opts.parent !== 'undefined' ? opts.parent : true

        opts.onFile = function (pathFile) {
          sm.emit('file', pathFile)
        }

        var pathDir = path.isAbsolute(pathSite) ? pathSite : path.join(vars.__dirname, pathSite)
        var siteSync = nanocontent.readSiteSync(pathDir, opts)

        var stream = through()
        stream.push(JSON.stringify(siteSync, { }, 2))
        stream.push(null)
        return stream
      }
    }
  }, {
    vars: vars,
    varModules: { path: path }
  })

  return sm
}
