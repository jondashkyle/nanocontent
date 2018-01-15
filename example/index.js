var css = require('sheetify')
var hypha = require('hypha')
var choo = require('choo')
css('./src/design/index.js')

var site = hypha.readSiteSync('./content', {
  parent: '/content'
})

var app = choo()

// content and routes
app.use(require('./src/stores/content')(site))
app.route('*', require('./src/views/notfound'))

// export and mount
if (module.parent) module.exports = app
else app.mount('body')
