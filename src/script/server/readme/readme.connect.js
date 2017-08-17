const { connectAll } = require('../../redux')
const service = require('./readme')

module.exports = connectAll(service)
