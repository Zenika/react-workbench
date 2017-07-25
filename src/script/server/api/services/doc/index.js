const { connectAll } = require('../../../../redux')
const service = require('./service')

module.exports = { NAME: 'DOC', ...connectAll(service) }
