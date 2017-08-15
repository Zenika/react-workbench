const { State } = require('markup-it')
const markdown = require('markup-it/lib/markdown')
const html = require('markup-it/lib/html')

module.exports = source => async () => {
  const stateMd = State.create(markdown)
  const document = stateMd.deserializeToDocument(source)

  const stateHtml = State.create(html)
  const transpiled = stateHtml.serializeDocument(document)

  return transpiled
}
