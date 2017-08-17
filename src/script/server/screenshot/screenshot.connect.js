const { connectAll } = require('../../redux')
const service = require('./screenshot')

module.exports = connectAll(service)
