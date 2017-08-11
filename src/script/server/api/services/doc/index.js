const { connectAll } = require('../../../../redux')
const service = require('./service')

module.exports = connectAll(service)
