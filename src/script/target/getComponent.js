const path = require('path')
const fs = require('fs')

module.exports = (fileName) => {
  const name = path.basename(fileName)
  const absolute = path.resolve(process.env.PWD, fileName)
  const dir = fs.lstatSync(absolute).isDirectory() ? absolute : path.dirname(absolute)

  return {
    name,
    path: {
      absolute: {
        dir,
        full: path.resolve(dir, name),
      },
    },
  }
}
