const doc = require('../services/doc')

const get = {
  method: 'get',
  path: 'readme',
  handler: async () => doc.generate('markdown'),
}

module.exports = {
  get,
}
