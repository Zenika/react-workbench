const state = require('../services/state')

const get = {
  method: 'get',
  path: 'state',
  handler: () => state.read(),
}

const post = {
  method: 'post',
  path: 'state',
  handler: req => state.create(req.body),
}

module.exports = {
  get,
  post,
}
