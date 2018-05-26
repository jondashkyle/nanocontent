var nanocontent = require('../')
var css = require('sheetify')
var choo = require('choo')

var site = nanocontent.readSiteSync('./content', {
  parent: '/content'
})

var app = choo()

// design
css('./src/design/index.js')

// content and routes
app.use(require('./src/stores/content')(site))
app.route('*', require('./src/views/notfound'))

// export and mount
if (module.parent) module.exports = app
else app.mount('body')
