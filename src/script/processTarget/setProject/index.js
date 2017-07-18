const { connectAll } = require('../../redux')
const setProject = require('./setProject')

module.exports = connectAll({
  setProject,
})
