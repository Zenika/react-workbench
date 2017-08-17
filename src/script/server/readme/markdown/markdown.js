const { service } = require('../../props')

const generateTitle = name => `# ${name}`

const generateDescription = (description = '') => `> ${description}`

const generateProp = (name, prop) => {
  return `${name}|${prop.required}|${prop.type.name}|${prop.description}\n`
}

const generateProps = (props) => {
  if (props) {
    const table = Object.keys(props)
      .reduce((a, b) => {
        return `${a}${generateProp(b, props[b])}`
      }, '')
    return `
      props|required|type|description
      -----|--------|----|-----------
      ${table}
    `
  }
  return ''
}

const generate = async (name) => {
  const docgen = await service.get()

  return `
${generateTitle(name)}

${generateDescription(docgen.description)}

${generateProps(docgen.props)}
`
}

module.exports = {
  generate,
  generateDescription,
  generateProps,
}
