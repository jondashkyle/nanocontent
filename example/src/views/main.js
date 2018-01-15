var objectValues = require('object-values')
var Markdown = require('markdown-it')
var html = require('choo/html')
var raw = require('bel/raw')
var md = new Markdown()

module.exports = view

function view (state, emit) {
  var page = state.page || { }

  return html`
    <body class="m0 ff-sans">
      <div class="p1">
        <div>name ${page.name || 'no name'}</div>
        <div>title ${page.title || 'Untitled'}</div>
        <div>text ${raw(md.render(page.text || 'No content'))}</div>
        ${page.pages ? pages() : ''}
      </div>
    </body>
  `

  function pages () {
    return objectValues(page.pages).map(function (subpage) {
      return html`<a href="${subpage.url}">${subpage.name}</a>`
    })
  }
}
