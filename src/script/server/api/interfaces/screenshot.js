const screenshot = require('../services/screenshot')

const get = {
  method: 'get',
  path: 'screenshot',
  handler: (req, res) => {
    const image = screenshot.capture(req.query)
    res.set('Content-Type', 'image/png')
    res.set('Content-Length', image.length)
    return image
  },
}

module.exports = {
  get,
}
