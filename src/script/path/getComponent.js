const path = require('path')
const fs = require('fs')

module.exports = (state) => {
  const { fileName } = state

  const name = path.basename(fileName)
  const absolute = path.resolve(process.env.PWD, fileName)
  const dir = fs.lstatSync(absolute).isDirectory() ? absolute : path.dirname(absolute)

  const component = {
    name,
    path: {
      absolute: {
        dir,
        full: path.resolve(dir, name),
      },
    },
  }

  return component
}
