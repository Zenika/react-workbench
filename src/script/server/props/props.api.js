const service = require('./props.connect')

const get = {
  method: 'get',
  path: 'props',
  handler: () => service.get(),
}

module.exports = {
  get,
}
