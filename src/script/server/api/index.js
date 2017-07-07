const bodyParser = require('body-parser')
const log = require('loglevel')
const { API_BASE_CONTEXT } = require('../../config/constants')
const state = require('./services/state')
const fs = require('./services/fs')
const docgen = require('./services/docgen')
const markdown = require('./services/markdown')
const readme = require('./services/readme')

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
  app.get(genPath(fs), errorHandler(() => fs.get('/')))
  app.get(`${genPath(fs)}/:path*`, errorHandler(req => fs.get(`/${req.params.path}/${req.params[0]}`)))
  app.post(`${genPath(fs)}/:path*`, errorHandler(req => fs.get(`/${req.params.path}/${req.params[0]}`, req.body)))
  // - docgen
  app.get(genPath(docgen), errorHandler(() => docgen.resolve(component.path.absolute.full)))
  // - markdown
  app.post(genPath(markdown), errorHandler(req => markdown.generate(component, req.body)))
  // - readme
  app.get(genPath(readme), errorHandler(() => readme.read(component)))
  app.post(genPath(readme), errorHandler(req => readme.write(component, req.body)))
}

module.exports = {
  connect,
}
