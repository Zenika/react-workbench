const connect = require('./connect')
const preview = require('./preview')
const props = require('./props')
const readme = require('./readme')

module.exports = (app, basePath) => ({
  preview: connect(app, basePath)(preview),
  props: connect(app, basePath)(props),
  readme: connect(app, basePath)(readme),
})
