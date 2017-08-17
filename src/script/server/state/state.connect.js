const { connectAll } = require('../../redux')
const service = require('./state')

module.exports = connectAll(service)
