const { NAME } = require('./constants')
const service = require('./service')

module.exports = { NAME, ...service }
