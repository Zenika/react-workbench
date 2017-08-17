const path = require('path')
const fs = require('fs')

const { reducers } = require('../../redux')
const markdown = require('./markdown')

const get = () => async (dispatch, getState) => {
  const component = reducers.component.get()(getState())

  // return README.md content
  const readmePath = path.resolve(component.path.absolute.dir, 'README.md')
  try {
    const content = await fs.readFileAsync(readmePath, 'utf8')
    return content
  } catch (ex) {
    if (ex.errno !== -2) throw ex // -2 is file not found
  }

  // generate readme markdown
  return markdown.generate(component.name)
}

module.exports = {
  get,
}
