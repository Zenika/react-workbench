const connect = require('./connect')
const readme = require('./readme')

module.exports = (app, basePath) => ({
  readme: connect(app, basePath)(readme),
})
