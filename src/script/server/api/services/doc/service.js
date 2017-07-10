const docgen = require('./docgen')
const markdown = require('./markdown')

const generate = async (component, format = 'docgen') => {
  const doc = await docgen.resolve(component.path.absolute.full)
  switch (format) {
    case 'markdown':
      return markdown(component.name, doc[0])
    default:
      return doc
  }
}

module.exports = {
  generate,
}
