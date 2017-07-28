const { connectAll } = require('../../redux')
const setWebpack = require('./setWebpack')

module.exports = connectAll({
  setWebpack,
})
