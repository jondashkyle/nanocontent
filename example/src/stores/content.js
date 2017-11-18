var xtend = require('xtend')
var views = require('../views')

module.exports = store

function store (site) {
  console.log(site)
  return function content (state, emitter, app) {
    state.content = { }

    site.forEach(function (page) {
      // set view and extend state
      var view = views[page.view] || views.main 
      state.content[page.url] = page

      app.route(page.url, function (state, emit) {
        return view(xtend(state, { page: page }) , emit)
      })
    })
  }
}