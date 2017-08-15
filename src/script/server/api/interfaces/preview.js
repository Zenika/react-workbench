const doc = require('../services/doc')

const post = {
  method: 'post',
  path: 'preview',
  handler: async (req) => {
    const markdown = req.body
    const html = doc.html(markdown)

    return html
  },
}

module.exports = {
  post,
}
