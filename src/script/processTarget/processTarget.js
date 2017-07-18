const { setProject } = require('./setProject')
const { setWebpack } = require('./setWebpack')
const { setComponent } = require('./setComponent')
const { genTemplate } = require('./genTemplate')

module.exports = async (path) => {
  // set component
  await setComponent(path)

  // set project
  await setProject()

  // set webpack configuration
  await setWebpack()

  // generate the inner template that call the component that we want to test
  await genTemplate()
}
