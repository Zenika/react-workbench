const connect = require('./connect')
const readme = require('./readme')
const props = require('./props')

module.exports = (app, basePath) => ({
  readme: connect(app, basePath)(readme),
  props: connect(app, basePath)(props),
})
