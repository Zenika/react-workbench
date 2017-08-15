const doc = require('../services/doc')

const get = {
  method: 'get',
  path: 'props',
  handler: async () => doc.docgen(),
}

module.exports = {
  get,
}
