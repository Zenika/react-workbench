const doc = require('../services/doc')

const get = {
  method: 'get',
  path: 'readme',
  handler: async () => doc.markdown(),
}

module.exports = {
  get,
}
