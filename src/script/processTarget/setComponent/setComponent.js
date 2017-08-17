const fs = require('fs')
const path = require('path')
const reducers = require('../../redux/reducers')

module.exports = fileName => async (dispatch) => {
  const name = path.basename(fileName)
  const absolute = path.resolve(process.env.PWD, fileName)
  const dir = (await fs.lstatAsync(absolute)).isDirectory() ? absolute : path.dirname(absolute)

  dispatch(reducers.component.set({
    name,
    path: {
      absolute: {
        dir,
        full: path.resolve(dir, name),
        workbench: path.resolve(dir, '.workbench'),
      },
    },
  }))
}
