const docgen2markdown = require('./docgen2markdown')

const generate = async (component, docgen) => {
  if (docgen) {
    // convert docgen to markdown
    return docgen2markdown(component.name, docgen)
  }
  return null
}

module.exports = {
  generate,
}
