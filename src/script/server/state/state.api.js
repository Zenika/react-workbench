const service = require('./state.connect')

const get = {
  method: 'get',
  path: 'state/:name',
  handler: req => service.read(req.params.name),
}

const post = {
  method: 'post',
  path: 'state/:name',
  handler: req => service.create(req.body, req.params.name),
}

const list = {
  method: 'get',
  path: 'state',
  handler: () => service.list(),
}

module.exports = {
  get,
  post,
  list,
}
