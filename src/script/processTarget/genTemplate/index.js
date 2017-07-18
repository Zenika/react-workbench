const { connectAll } = require('../../redux')
const genTemplate = require('./genTemplate')

module.exports = connectAll({
  genTemplate,
})
