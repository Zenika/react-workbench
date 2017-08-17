const service = require('./preview.connect')

const post = {
  method: 'post',
  path: 'preview',
  handler: req => service.get(req.body),
}

module.exports = {
  post,
}
