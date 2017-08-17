const service = require('./debug.connect')

const get = {
  method: 'get',
  path: 'debug',
  handler: () => service.get(),
}

module.exports = {
  get,
}
