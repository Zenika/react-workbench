const doc = require('../services/doc')

const post = {
  method: 'post',
  path: 'preview',
  handler: async req => doc.html(req.body),
}

module.exports = {
  post,
}
