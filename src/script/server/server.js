const express = require('express')
const log = require('loglevel')
const reducers = require('../redux/reducers')
const bundle = require('./bundle')
const api = require('./api')

const start = () => (dispatch, getState) => {
  // get config
  const { PUBLIC_FOLDER, PORT } = reducers.config.get()(getState())

  // create a new express server
  const app = express()

  // serve static files
  app.use(express.static(PUBLIC_FOLDER))

  // serve webpack bundle
  bundle(app)

  // serve api
  api(app)

  // listen
  app.listen(PORT, () => {
    log.info(`Listen to localhost:${PORT}`)
  })
}

module.exports = {
  start,
}
