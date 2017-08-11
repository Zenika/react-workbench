const doc = require('../services/doc')

const get = {
  method: 'get',
  path: 'props',
  handler: async () => doc.generate('docgen'),
}

module.exports = {
  get,
}
