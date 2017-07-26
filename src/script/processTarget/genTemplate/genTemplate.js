const path = require('path')
const fs = require('fs')
const reducers = require('../../redux/reducers')

module.exports = () => async (dispatch, getState) => {
  const component = reducers.component.get()(getState())

   // read the template file
  const filePath = path.resolve(__dirname, 'template.js')
  const template = await fs.readFileAsync(filePath, 'utf-8')

  // get relative path
  const output = { dir: path.resolve(__dirname, '..', '..', '..', '..', 'dist'), file: 'component.js' }
  let relativePath = path.relative(output.dir, component.path.absolute.full)

  // this handle the case of index.jsx (template) and tested component sharing the same directory.
  // in this case the relative path is <testedComponent> without '/' wich is an absolute import
  // so we force it to a relative import by adding './'  : './<testedComponent'
  relativePath = relativePath.includes('/') ?
    relativePath // relative path is also a relative import, that's ok
    : `./${relativePath}` // relative path is an absolute import : force the relative import

  // inject the component path into the import of the template file
  const appFileContent = template.replace(
    '/* react-workbench-insert import */',
     relativePath // eslint-disable-line comma-dangle
  )

  // write it into a tmp folder
  try {
    await fs.mkdirAsync(output.dir)
  } catch (ex) {
    if (ex.errno !== -17) { // -17 is directory already exists
      throw ex
    }
  }
  const fullpath = path.resolve(output.dir, output.file)
  await fs.writeFileAsync(fullpath, appFileContent)
}
