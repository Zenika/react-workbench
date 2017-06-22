const fs = require('fs')
const { COMPONENT_CONFIG_DIR } = require('./constants')

const init = (name) => {
  const DATABASE_PATH = `${COMPONENT_CONFIG_DIR}/${name}.json`

  const write = async (data = []) => {
    // create configuration directory
    try {
      await fs.mkdirAsync(COMPONENT_CONFIG_DIR)
    } catch (ex) {
      if (ex.errno !== -17) throw ex // -17 is directory exist
    }

    // write data into directory
    await fs.writeFileAsync(DATABASE_PATH, JSON.stringify(data))

    return data
  }

  const read = async () => {
    let content

    try {
      const fileContent = await fs.readFileAsync(DATABASE_PATH)
      if (fileContent) {
        content = JSON.parse(fileContent)
      }
    } catch (ex) {
      if (ex.errno !== -2) throw ex // -2 is file not found
    }

    return content
  }

  const append = async (data = []) => {
    const content = (await read()) || []

    const all = content.concat(data)
    await write(all)

    return all
  }

  return {
    read,
    write,
    append,
  }
}

module.exports = init
