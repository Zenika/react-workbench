const { connectAll } = require('../../../../redux')
const service = require('./screenshot')

module.exports = { NAME: 'SCREENSHOT', ...connectAll(service) }
