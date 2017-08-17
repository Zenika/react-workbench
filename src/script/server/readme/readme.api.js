const service = require('./readme.connect')

const get = {
  method: 'get',
  path: 'readme',
  handler: () => service.get(),
}

module.exports = {
  get,
}
