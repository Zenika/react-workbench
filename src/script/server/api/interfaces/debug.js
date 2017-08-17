const debug = require('../services/debug')

const get = {
  method: 'get',
  path: 'debug',
  handler: () => debug.get(),
}

module.exports = {
  get,
}
