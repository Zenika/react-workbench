const doc = require('../services/doc')

const get = {
  method: 'get',
  path: 'readme',
  handler: () => doc.markdown(),
}

module.exports = {
  get,
}