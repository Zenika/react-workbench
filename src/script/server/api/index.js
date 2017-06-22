const bodyParser = require('body-parser')
const log = require('loglevel')
const { API_BASE_CONTEXT } = require('../../config/constants')
const state = require('./services/state')
const fs = require('./services/fs')
const docgen = require('./services/docgen')

const genPath = resource => `${API_BASE_CONTEXT}/${resource.NAME}`

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

const connect = (app, component) => {
  // use json for api
  app.use(API_BASE_CONTEXT, bodyParser.json())

  // connects services
  // - state
  app.get(genPath(state), errorHandler(() => state.read()))
  app.post(genPath(state), errorHandler(req => state.create(req.body)))
  // - fs
  app.get(genPath(fs), errorHandler(() => fs.ls('/')))
  app.get(`${genPath(fs)}/:path*`, errorHandler(req => fs.ls(`/${req.params.path}/${req.params[0]}`)))
  // - docgen
  app.get(genPath(docgen), errorHandler(() => docgen.resolve(component.path.absolute.full)))
}

module.exports = {
  connect,
}
