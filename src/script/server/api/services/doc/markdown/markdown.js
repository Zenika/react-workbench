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

module.exports = (name, doc) => `
${generateTitle(name)}

${generateDescription(doc.description)}

${generateProps(doc.props)}
`
