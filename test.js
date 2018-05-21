var test = require('ava')
var nanocontent = require('.')

test('readPageSync works', function (t) {
  var page = nanocontent.readPageSync('example/content/about')
  t.is(page.title, 'About')
  t.is(page.view, 'custom')
})

test('readPage works', async function (t) {
  var page = await nanocontent.readPage('example/content/about')
  t.is(page.title, 'About')
  t.is(page.view, 'custom')
})

test('readPageSync and readPage outputs are the same', async function (t) {
  var syncPage = nanocontent.readPageSync('example/content/about')
  var asyncPage = await nanocontent.readPage('example/content/about')
  t.deepEqual(syncPage, asyncPage)
})

test('readSiteSync works', function (t) {
  var site = nanocontent.readSiteSync('example/content')
  t.is(site['/example/content'].title, 'Example')
  t.is(site['/example/content/about'].title, 'About')
})

test('readSiteSync and readSite outputs are the same', async function (t) {
  var syncSite = nanocontent.readSiteSync('example/content')
  var asyncSite = await nanocontent.readSite('example/content')
  t.deepEqual(syncSite, asyncSite)
})

test('readSiteSync and readSite outputs are the same with parent option', async function (t) {
  var syncSite = nanocontent.readSiteSync('example/content', { parent: true })
  var asyncSite = await nanocontent.readSite('example/content', { parent: true })
  t.deepEqual(syncSite, asyncSite)
})
