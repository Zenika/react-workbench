const path = require('path')
const fs = require('fs')
const { reducers } = require('../../redux')

const init = () => (dispatch, getState) => {
  const component = reducers.component.get()(getState())
  const projectPath = component.path.absolute.workbench

  const getFilePath = fileName => path.resolve(projectPath, fileName)

  const createDir = async () => {
    try {
      await fs.mkdirAsync(projectPath)
    } catch (ex) {
      if (ex.errno !== -17) throw ex // -17 is directory exist
    }
  }

  const write = async (fileName, data = []) => {
    await createDir()

    await fs.writeFileAsync(getFilePath(fileName), JSON.stringify(data))

    return data
  }

  const read = async (fileName) => {
    await createDir()

    let content
    try {
      const fileContent = await fs.readFileAsync(getFilePath(fileName))
      if (fileContent) {
        content = JSON.parse(fileContent)
      }
    } catch (ex) {
      if (ex.errno !== -2) throw ex // -2 is file not found
    }

    return content
  }

  const append = async (fileName, data = []) => {
    await createDir()

    const content = (await read(fileName)) || []
    const all = content.concat(data)
    await write(fileName, all)

    return all
  }

  return {
    read,
    write,
    append,
  }
}

module.exports = init
