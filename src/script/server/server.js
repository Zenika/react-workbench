const express = require('express')
const log = require('loglevel')
const { PORT, PUBLIC_FOLDER } = require('./constants') // FIXME : move it to redux
const { bundle } = require('./bundle')
const api = require('./api')

const start = () => {
  // create a new express server
  const app = express()

  // serve static files
  app.use(express.static(PUBLIC_FOLDER))

  // serve webpack bundle
  bundle(app)

  // serve api
  api.connect(app)

  // listen
  app.listen(PORT, () => {
    log.info(`Listen to localhost:${PORT}`)
  })
}

module.exports = {
  start,
}
