const { connectAll } = require('../../redux')
const service = require('./props')

module.exports = connectAll(service)
