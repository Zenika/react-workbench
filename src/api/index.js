const bodyParser = require('body-parser')
const { API_BASE_CONTEXT } = require('../constants')
const state = require('./models/state')

const genPath = resource => `${API_BASE_CONTEXT}/${resource.NAME}`

const connect = (app) => {
  // use json for api
  app.use(API_BASE_CONTEXT, bodyParser.json())

  // connects services
  // 1. State
  app.post(genPath(state), async (req, res) => {
    try {
      await state.create(req.body)
      res.sendStatus(200)
    } catch (ex) {
      // TODO
      // eslint-disable-next-line no-console
      console.error(ex)
      res.sendStatus(500)
    }
  })
}

module.exports = {
  connect,
}
