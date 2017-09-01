const service = require('./readme.connect')

const get = {
  method: 'get',
  path: 'readme',
  handler: () => service.get(),
}

const save = {
  method: 'post',
  path: 'readme',
  handler: req => service.save(req.body),
}

module.exports = {
  get,
  save,
}
