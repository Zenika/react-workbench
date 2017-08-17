const service = require('./state.connect')

const get = {
  method: 'get',
  path: 'state',
  handler: () => service.read(),
}

const post = {
  method: 'post',
  path: 'state',
  handler: req => service.create(req.body),
}

module.exports = {
  get,
  post,
}
