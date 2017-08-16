const bodyParser = require('body-parser')
const reducers = require('../../redux/reducers')
const interfaces = require('./interfaces')

const connect = app => (dispatch, getState) => {
  // config
  const { API_BASE_CONTEXT } = reducers.config.get()(getState())

  // bodyparsing
  app.use(API_BASE_CONTEXT, bodyParser.json())
  app.use(API_BASE_CONTEXT, bodyParser.text())

  // connects interfaces
  interfaces(app, `${API_BASE_CONTEXT}/`)
}

module.exports = connect
