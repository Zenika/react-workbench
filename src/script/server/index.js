const { connectAll } = require('../redux')
const server = require('./server')

module.exports = connectAll(server)
