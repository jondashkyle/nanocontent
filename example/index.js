var css = require('sheetify')
var hypha = require('hypha')
var xtend = require('xtend')
var choo = require('choo')

var site = hypha.readSiteSync('./content', {
  parent: '/content'
})

var views = require('./src/views')
var app = choo()

css('./src/design/index.js')
app.use(require('./src/stores/content')(site))

// routes
app.route('*', require('./src/views/notfound'))

// export and mount
if (module.parent) module.exports = app
else app.mount('body')
