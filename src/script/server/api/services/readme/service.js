const fs = require('fs')
const path = require('path')

const save = async (component, content) => {
  await fs.writeFileAsync(path.resolve(component.path.absolute.dir, 'README.md'), content)
}

const read = async (component) => {
  try {
    return await fs.readFileAsync(path.resolve(component.path.absolute.dir, 'README.md'))
  } catch (ex) {
    if (ex.errno !== -2) return null // -2 is file not found
  }
  return null
}

module.exports = {
  read,
  save,
}
