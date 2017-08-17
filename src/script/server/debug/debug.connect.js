const { connectAll } = require('../../redux')
const service = require('./debug')

module.exports = connectAll(service)
