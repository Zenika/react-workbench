const connect = require('./connect')

const debug = require('./debug')
const preview = require('./preview')
const props = require('./props')
const readme = require('./readme')
const state = require('./state')

module.exports = (app, basePath) => ({
  debug: connect(app, basePath)(debug),
  preview: connect(app, basePath)(preview),
  props: connect(app, basePath)(props),
  readme: connect(app, basePath)(readme),
  state: connect(app, basePath)(state),
})
