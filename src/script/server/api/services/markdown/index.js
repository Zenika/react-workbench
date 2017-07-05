const { NAME } = require('./constants')
const service = require('./service')

module.exports = Object.assign(
  {},
  { NAME },
  service
)
