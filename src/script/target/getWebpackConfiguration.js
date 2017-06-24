const getProjectPath = require('./getProjectPath')
const { getConfiguration } = require('./webpack')

module.exports = state => getConfiguration(state, { getProjectPath })
