const doc = require('../services/doc')

const get = {
  method: 'get',
  path: 'props',
  handler: () => doc.docgen(),
}

module.exports = {
  get,
}
