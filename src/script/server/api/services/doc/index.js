const { connectAll } = require('../../../../redux')
const html = require('./html')
const docgen = require('./docgen')
const markdown = require('./markdown')

module.exports = connectAll({ html, docgen, markdown })
