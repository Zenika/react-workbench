const reducers = require('../../../../redux/reducers')
const docgen = require('./docgen')
const markdown = require('./markdown')
const html = require('./html')

const generate = (format = 'docgen') => async (dispatch, getState) => {
  const { path, name } = reducers.component.get()(getState())
  const doc = await docgen.resolve(path.absolute.full)

  switch (format) {
    case 'markdown':
      return markdown(name, doc[0])
    case 'html':
      return html(markdown(name, doc[0]))
    default:
      return doc
  }
}

module.exports = {
  generate,
}