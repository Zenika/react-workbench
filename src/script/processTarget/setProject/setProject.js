const log = require('loglevel')
const path = require('path')
const fs = require('fs')
const componentStore = require('../../redux/reducers/component')
const store = require('../../redux/reducers/project')

module.exports = () => async (dispatch, getState) => {
  const component = componentStore.get()(getState())

  let previousPath = component.path.absolute.dir
  let files = await fs.readdirAsync(previousPath)
  let error = false

  // looking for the first directory with a 'package.json' file
  while (!files.includes('package.json')) {
    previousPath = path.resolve(previousPath, '..')
    log.debug(`Looking for package.json into [${previousPath}]`)
    files = await fs.readdirAsync(previousPath)

    // basename is empty, we are at the file system root
    if (path.basename(previousPath) === '') {
      log.warn('package.json not found, unable to identify project root')
      error = true
    }
  }

  if (!error) dispatch(store.set({ path: previousPath }))
}
