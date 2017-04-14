const express = require('express')
const { PORT, PUBLIC_FOLDER } = require('./constants')
const webpack = require('./webpack/webpack')
const api = require('./api')

const start = () => {
  // Create a new express server
  const app = express()

  // serve static files
  app.use(express.static(PUBLIC_FOLDER))

  // serve webpack
  webpack.connect(app)

  // serve api
  api.connect(app)

  // listen
  app.listen(PORT, () => {
    // FIXME : delete this eslint-disable
    // eslint-disable-next-line no-console
    console.log(`Listen to localhost:${PORT}`)
  })
}

module.exports = {
  start,
}
