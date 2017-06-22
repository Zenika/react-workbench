const path = require('path')
const fs = require('fs')

module.exports = async (component) => {
   // 1. Read the template file
  const filePath = path.resolve(__dirname, 'template.js')
  const template = await fs.readFileAsync(filePath, 'utf-8')

  // 2. Get relative path
  const output = { dir: path.resolve(__dirname, '..', '..', '..', 'public'), file: 'component.js' }
  let relativePath = path.relative(output.dir, component.path.absolute.full)

  // 2bis -
  // this handle the case of index.jsx (template) and tested component sharing the same directory.
  // in this case the relative path is <testedComponent> without '/' wich is an absolute import
  // so we force it to a relative import by adding './'  : './<testedComponent'
  relativePath = relativePath.includes('/') ?
    relativePath // relative path is also a relative import, that's ok
    : `./${relativePath}` // relative path is an absolute import : force the relative import

  // 2. Replace what needs to be replaced
  const appFileContent = template.replace(
    '/* react-workbench-insert import */',
     relativePath // eslint-disable-line comma-dangle
  )

  // 3. Write it into a tmp folder
  // 3.a Create the tmp folder
  try {
    await fs.mkdirAsync(output.dir)
  } catch (ex) {
    if (ex.errno !== -17) { // -17 is directory already exists
      throw ex
    }
  }
  // 3.b Write file
  const fullpath = path.resolve(output.dir, output.file)
  await fs.writeFileAsync(fullpath, appFileContent)
}
