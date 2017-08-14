const bodyParser = require('body-parser')
const log = require('loglevel')
const reducers = require('../../redux/reducers')
const state = require('./services/state')
const doc = require('./services/doc')
const screenshot = require('./services/screenshot')

const errorHandler = callback => async (req, res, ...args) => {
  try {
    const content = await callback(req, res, ...args)
    if (content) {
      res.send(content)
    } else {
      res.sendStatus(200)
    }
  } catch (ex) {
    log.error(ex)
    res.status(500).send({ ex })
  }
}

const connect = app => (dispatch, getState) => {
  // config
  const { API_BASE_CONTEXT } = reducers.config.get()(getState())

  // helper to generate HTTP URL path
  const genPath = resource => `${API_BASE_CONTEXT}/${resource.NAME}`

  // use json for api
  app.use(API_BASE_CONTEXT, bodyParser.json())

  // connects services
  // - state
  app.get(genPath(state), errorHandler(() => state.read()))
  app.post(genPath(state), errorHandler(req => state.create(req.body)))
  // - documentation
  app.get(genPath(doc), errorHandler(req => doc.generate(req.query.format)))
  // - screenshot
  app.get(
    genPath(screenshot),
    errorHandler((req, res) => {
      const image = screenshot.capture(req.query)
      res.set('Content-Type', 'image/png')
      res.set('Content-Length', image.length)
      return image
    })
  )
}

module.exports = connect
