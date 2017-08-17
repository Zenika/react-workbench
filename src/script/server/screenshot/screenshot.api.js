const service = require('./screenshot.connect')

const get = {
  method: 'get',
  path: 'screenshot',
  handler: (req, res) => {
    const image = service.capture(req.query)
    res.set('Content-Type', 'image/png')
    res.set('Content-Length', image.length)
    return image
  },
}

module.exports = {
  get,
}
