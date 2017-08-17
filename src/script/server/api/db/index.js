const { connect } = require('../../../redux')
const db = require('./db')

module.exports = connect(db)
