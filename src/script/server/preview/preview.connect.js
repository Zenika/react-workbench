const { connectAll } = require('../../redux')
const service = require('./preview')

module.exports = connectAll(service)
